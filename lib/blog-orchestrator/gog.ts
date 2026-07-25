import { execFileSync } from 'node:child_process';

const GOG_PATH = process.env.GOG_CLI_PATH || 'C:\\gogcli\\gog.exe';

export function gogAccount() {
  const account = process.env.GOG_ACCOUNT;
  if (!account) throw new Error('GOG_ACCOUNT is required for Drive, Docs, and Sheets steps');
  return account;
}

export function gog(args: string[]) {
  try {
    return execFileSync(GOG_PATH, [...args, '--account', gogAccount()], {
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
      windowsHide: true,
    });
  } catch (error) {
    const detail = error instanceof Error && 'stderr' in error
      ? String((error as { stderr?: string }).stderr || error.message)
      : String(error);
    throw new Error(`gogcli ${args[0]} ${args[1] ?? ''} failed: ${detail.trim().split('\n').slice(-3).join(' ')}`);
  }
}

export function gogJson<T>(args: string[]): T {
  const output = gog([...args, '-j']);
  try {
    return JSON.parse(output) as T;
  } catch {
    throw new Error(`gogcli ${args.slice(0, 2).join(' ')} returned non-JSON output`);
  }
}

export function columnLetter(index: number) {
  let letter = '';
  for (let value = index + 1; value > 0; value = Math.floor((value - 1) / 26)) {
    letter = String.fromCharCode(65 + ((value - 1) % 26)) + letter;
  }
  return letter;
}
