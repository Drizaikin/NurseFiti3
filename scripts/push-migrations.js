/**
 * Apply pending migrations directly via Supabase Management API
 * This bypasses the CLI migration tracker to handle duplicate version issues
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
const envVars = {};
envFile.split(/[\r\n]+/).forEach(line => {
  if (!line || line.startsWith('#')) return;
  const idx = line.indexOf('=');
  if (idx > 0) {
    const key = line.substring(0, idx).trim();
    const val = line.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
    envVars[key] = val;
  }
});

const url = envVars.NEXT_PUBLIC_SUPABASE_URL || '';
const PROJECT_REF = url.split('.')[0].split('//')[1];
const SERVICE_ROLE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY;

const MIGRATIONS_DIR = path.join(__dirname, '..', 'supabase', 'migrations');

// Pending migrations to apply in order
const PENDING = [
  '20260711000001_seed_mcq_compilation_set3.sql'
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
