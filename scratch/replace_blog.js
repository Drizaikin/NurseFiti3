const fs = require('fs');

const oldSlug = 'nck-exam-foreign-trained-nurses-kenya';
const newSlug = 'nursing-clinical-placement-survival-kenya';

const newExcerpt = 'Discover the reality of the theory-practice gap during BScN clinical rotations in Kenya. Learn how to learn effectively, avoid burnout, and pass the NCK exam.';

const blogDataPath = 'lib/blogData.ts';
let blogData = fs.readFileSync(blogDataPath, 'utf8');

// Replace slug, title, excerpt
blogData = blogData.replace(oldSlug, newSlug);
blogData = blogData.replace('NCK Licensing Exam for Foreign-Trained Nurses in Kenya (2026)', 'Surviving Your First Clinical Placement in a Kenyan Public Hospital (2026)');
blogData = blogData.replace('A complete guide on how to register and license as a nurse trained outside Kenya (NTOK). Learn about the NCK verification process, required documents, and licensure exam.', newExcerpt);
// Also category change
// The previous was 'Study Guide', let's change it to 'Study Strategy'
// Need to be careful. The first occurrence in the POSTS array for the new blog is the one we want to change.
// Since we prepended it, it should be the first one. Let's do a replace that matches the block.

const blockRegex = /slug:\s*'nursing-clinical-placement-survival-kenya'[\s\S]*?category:\s*'Study Guide'/;
blogData = blogData.replace(blockRegex, (match) => {
    return match.replace("'Study Guide'", "'Study Strategy'");
});

// Replace the image url
blogData = blogData.replace(oldSlug, newSlug); // for the image dictionary
// Also we need to change the image url if needed. Let's use a new Unsplash image related to clinicals/hospital.
const oldImageUrl = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&auto=format&fit=crop';
const newImageUrl = 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80&auto=format&fit=crop';
blogData = blogData.replace(oldImageUrl, newImageUrl);

fs.writeFileSync(blogDataPath, blogData);
console.log('Updated blogData.ts');

const pagePath = 'app/blog/[slug]/page.tsx';
let pageData = fs.readFileSync(pagePath, 'utf8');

// Replace slug, title, excerpt
pageData = pageData.replace(oldSlug, newSlug);
pageData = pageData.replace('NCK Licensing Exam for Foreign-Trained Nurses in Kenya (2026)', 'Surviving Your First Clinical Placement in a Kenyan Public Hospital (2026)');
pageData = pageData.replace('A complete guide on how to register and license as a nurse trained outside Kenya (NTOK). Learn about the NCK verification process, required documents, and licensure exam.', newExcerpt);

pageData = pageData.replace(blockRegex, (match) => {
    return match.replace("'Study Guide'", "'Study Strategy'");
});

pageData = pageData.replace(oldSlug, newSlug); // for the image dictionary
pageData = pageData.replace(oldImageUrl, newImageUrl);

// Replace content
const contentText = fs.readFileSync('C:/Users/User/.gemini/antigravity-ide/brain/6974a4d9-38f1-4c5a-9320-3fb0a3eb1206/scratch/clinical_blog_content.txt', 'utf8');

// We need to replace the content block of the old post.
// The old post content started with `The Nursing Council of Kenya (NCK) requires all nurses trained outside Kenya` 
// and ended with `*Always verify current registration requirements directly at [nckenya.com](https://www.nckenya.com).*`

const contentRegex = /content:\s*`\s*The Nursing Council of Kenya \(NCK\) requires[\s\S]*?\*Always verify current registration requirements directly at \[nckenya\.com\]\(https:\/\/www\.nckenya\.com\)\.\*\s*`,/m;

pageData = pageData.replace(contentRegex, `content: \`\n${contentText.replace(/\r/g, '')}\n\`,`);

fs.writeFileSync(pagePath, pageData);
console.log('Updated app/blog/[slug]/page.tsx');
