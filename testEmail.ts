import * as fs from 'fs';
import { sendWelcomeEmail } from './lib/email';

async function test() {
  // Load environment variables manually
  const envText = fs.readFileSync('.env.local', 'utf8');
  envText.split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && rest.length > 0) {
      // Remove quotes if present
      process.env[key.trim()] = rest.join('=').trim().replace(/^['"]|['"]$/g, '');
    }
  });

  console.log('Sending welcome email with config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS ? '***' : undefined,
  });

  try {
    const res = await sendWelcomeEmail({ 
      to: 'danotyanga@gmail.com', 
      firstName: 'Danotyanga' 
    });
    console.log('Result:', res);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
