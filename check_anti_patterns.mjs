import fs from 'fs';
import path from 'path';

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('.next')) {
        scanDir(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Look for useEffect without dependency array
      const noDeps = content.match(/useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[^}]*\}\s*\)/g);
      if (noDeps) {
        console.log(`[Warning: No deps useEffect] ${fullPath}`);
      }
      
      // Look for setInterval without cleanup
      const setIntervalMatch = content.match(/setInterval/g);
      const clearIntervalMatch = content.match(/clearInterval/g);
      if (setIntervalMatch && (!clearIntervalMatch || setIntervalMatch.length > clearIntervalMatch.length)) {
        console.log(`[Warning: Uncleaned setInterval] ${fullPath}`);
      }

      // Look for large data loads inside useEffect without pagination
      if (content.includes('.select(') && !content.includes('.limit(') && !content.includes('.single(') && !content.includes('.count(')) {
        console.log(`[Warning: Unbounded query] ${fullPath}`);
      }
    }
  }
}

scanDir('C:/Users/rizik/Desktop/NurseFiti/NurseFiti3/app');
