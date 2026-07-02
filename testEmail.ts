import * as fs from 'fs';
import { sendEmail } from './lib/email';

async function test() {
  const envText = fs.readFileSync('.env.local', 'utf8');
  envText.split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && rest.length > 0) {
      process.env[key.trim()] = rest.join('=').trim();
    }
  });

  console.log('Sending email with config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS ? '***' : undefined,
  });

  try {
    const res = await sendEmail('danotyanga@gmail.com', 'Test Subject', 'This is a test email.\n\nIt should work.');
    console.log('Result:', res);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
