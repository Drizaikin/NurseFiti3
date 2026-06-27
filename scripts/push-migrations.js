/**
 * Apply pending migrations directly via Supabase Management API
 * This bypasses the CLI migration tracker to handle duplicate version issues
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

// Project ref extracted from Supabase URL
const PROJECT_REF = 'wnfbjyfenvdofvfcxnzk';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZmJqeWZlbnZkb2Z2ZmN4bnprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTE5NTgxNiwiZXhwIjoyMDk0NzcxODE2fQ.5TQOHD5G889WdbrsNzN1pIoV87Ldji2uIpF_bgFVS0M';

const MIGRATIONS_DIR = path.join(__dirname, '..', 'supabase', 'migrations');

// Pending migrations to apply in order
const PENDING = [
  '20260626000001_seed_nck_compilation_bscn_paper1.sql',
  '20260627000001_seed_flashcard_batch3.sql',
  '20260627000001_seed_nck_2024_bscn_paper1.sql',
  '20260627000002_seed_nck_2024_krchn_paper1.sql',
  '20260627000003_seed_nck_2024_paper2.sql',
];

function makeRequest(endpoint, method, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : '';
    const options = {
      hostname: 'api.supabase.com',
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

async function runSQL(sql) {
  const endpoint = `/v1/projects/${PROJECT_REF}/database/query`;
  return makeRequest(endpoint, 'POST', { query: sql });
}

async function getQuestionCount() {
  const result = await runSQL('SELECT COUNT(*) as cnt FROM questions');
  if (result.status === 200 && result.body) {
    const rows = Array.isArray(result.body) ? result.body : result.body.result || [];
    if (rows.length > 0) return rows[0].cnt || rows[0].count;
  }
  return 'unknown';
}

async function main() {
  console.log('Checking question count before migrations...');
  const before = await getQuestionCount();
  console.log(`Questions before: ${before}`);

  for (const file of PENDING) {
    const filePath = path.join(MIGRATIONS_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.log(`SKIP (not found): ${file}`);
      continue;
    }

    const sql = fs.readFileSync(filePath, 'utf8');
    console.log(`\nApplying: ${file} (${Math.round(sql.length/1024)}KB)...`);

    const result = await runSQL(sql);
    if (result.status === 200 || result.status === 201) {
      console.log(`  ✓ Success (HTTP ${result.status})`);
    } else {
      console.log(`  ✗ Failed (HTTP ${result.status})`);
      console.log(`  Response:`, JSON.stringify(result.body).substring(0, 500));
    }
  }

  console.log('\nChecking question count after migrations...');
  const after = await getQuestionCount();
  console.log(`Questions after: ${after}`);
}

main().catch(console.error);
