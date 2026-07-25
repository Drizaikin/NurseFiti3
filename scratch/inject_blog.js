const fs = require('fs');

const newPostExcerpt = 'A complete guide on how to register and license as a nurse trained outside Kenya (NTOK). Learn about the NCK verification process, required documents, and licensure exam.';

const blogDataPath = 'lib/blogData.ts';
let blogData = fs.readFileSync(blogDataPath, 'utf8');

// Fix the git conflict in blogData.ts
blogData = blogData.replace(/<<<<<<< HEAD\r?\n(.*?)\r?\n=======\r?\n>>>>>>> [a-f0-9]+/s, '$1');

const newBlogDataObj = `  {
    slug: 'nck-exam-foreign-trained-nurses-kenya',
    title: 'NCK Licensing Exam for Foreign-Trained Nurses in Kenya (2026)',
    excerpt: '${newPostExcerpt}',
    category: 'Study Guide',
    readTime: '6 min read',
    date: '2026-07-22',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
  },`;

blogData = blogData.replace('export const POSTS = [', 'export const POSTS = [\n' + newBlogDataObj);

const newImageEntry = `  'nck-exam-foreign-trained-nurses-kenya': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&auto=format&fit=crop',`;
blogData = blogData.replace('export const POST_IMAGES: Record<string, string> = {', 'export const POST_IMAGES: Record<string, string> = {\n' + newImageEntry);

blogData = blogData.replace(/<<<<<<< HEAD\r?\n(.*?)\r?\n=======\r?\n>>>>>>> [a-f0-9]+/s, '$1');

fs.writeFileSync(blogDataPath, blogData);
console.log('Fixed blogData.ts and added new blog metadata.');

const pagePath = 'app/blog/[slug]/page.tsx';
let pageData = fs.readFileSync(pagePath, 'utf8');

const contentText = fs.readFileSync('C:/Users/User/.gemini/antigravity-ide/brain/6974a4d9-38f1-4c5a-9320-3fb0a3eb1206/scratch/blog2_content.txt', 'utf8');

const newPostObj = `  {
    slug: 'nck-exam-foreign-trained-nurses-kenya',
    title: 'NCK Licensing Exam for Foreign-Trained Nurses in Kenya (2026)',
    excerpt: '${newPostExcerpt}',
    category: 'Study Guide',
    readTime: '6 min read',
    date: '2026-07-22',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: \`
${contentText.replace(/\r/g, '')}\`,
  },`;

pageData = pageData.replace('const POSTS_EXTRA: Post[] = [', 'const POSTS_EXTRA: Post[] = [\n' + newPostObj);

if (pageData.includes('const POST_IMAGES: Record<string, string> = {')) {
  pageData = pageData.replace('const POST_IMAGES: Record<string, string> = {', 'const POST_IMAGES: Record<string, string> = {\n' + newImageEntry);
}
// Fix conflicts if any in page.tsx
pageData = pageData.replace(/<<<<<<< HEAD\r?\n(.*?)=======\r?\n>>>>>>> [a-f0-9]+/s, '$1');
pageData = pageData.replace(/<<<<<<< HEAD\r?\n(.*?)=======\r?\n>>>>>>> [a-f0-9]+/s, '$1');

fs.writeFileSync(pagePath, pageData);
console.log('Added new blog object to app/blog/[slug]/page.tsx');
