import { spawnSync } from 'node:child_process';

const gog = 'C:\\gogcli\\gog.exe';
const account = 'ngcoboharry@gmail.com';
const keywordSheet = '1z6_oQ9Tca05-NVbEN-wSjPz3n51CU3I07hNDfHEKo2o';
const publishedSheet = '1Qxd6VDTs4e6NQMRd7byOBbqZifWKuqNBBwwJyc2FcaI';
const baseUrl = 'https://www.nursefiti.co.ke';
const draftFolder = '1W5Vl0g4fCwrcPNYgWdjWlcSQOBWgj70n';
const auditFolder = '18KNNp3FsZh5ZNn5C2rgEIklmjw05R8Xh';
const researchFolder = '1ebWyoVc5UUUbLLwqCEj3QI312-KGdFVb';

function update(sheetId, range, values, input = 'USER_ENTERED') {
  const result = spawnSync(gog, [
    'sheets', 'update', sheetId, range,
    '--values-json', JSON.stringify(values),
    '--input', input,
    '--account', account,
  ], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`${range}: ${result.stderr || result.stdout}`);
  console.log(`Updated ${range}`);
}

function run(args, label) {
  const result = spawnSync(gog, [...args, '--account', account], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`${label}: ${result.stderr || result.stdout}`);
  console.log(label);
}

const keywordHeaders = [[
  'keyword_id', 'keyword', 'title', 'search_volume', 'kw_difficulty', 'cpc',
  'keyword_type', 'cluster_role', 'cluster_name', 'paa_questions',
  'top_3_competitors', 'search_intent', 'aeo_priority_score',
  'seo_priority_score', 'combined_score', 'status', 'assigned_article_date',
  'yearly_trend_pct', 'notes', 'content_audience',
]];

const methodology = [
  ['FIELD', 'VALUE'],
  ['Version', 'NurseFiti Keyword Universe v1'],
  ['Status', 'Framework created; keyword research not yet run'],
  ['Target market', 'Kenya'],
  ['Primary audience', 'Kenyan nursing students and NCK candidates'],
  ['Discovery sources', 'Reddit language mining; DataForSEO Keywords Data; SERP/PAA; competitor gaps'],
  ['Selection rule', 'One keyword per intent; semantic cannibalization review mandatory'],
  ['Minimum quality', 'No weak or drop keywords in the final approved universe'],
  ['Publishing boundary', 'Orchestrator creates CMS drafts only; human admin publishes'],
];

const guardrails = [
  ['FIELD', 'VALUE'],
  ['SECTION 1 - IDENTITY', ''],
  ['Brand Name', 'NurseFiti'],
  ['Website', baseUrl],
  ['Blog URL', `${baseUrl}/blog`],
  ['Positioning', 'Independent Kenyan nursing education and NCK exam preparation platform'],
  ['Independence', 'Never imply NCK, MOH, KEMSA, college, or government approval, partnership, or endorsement'],
  ['Audience', 'Kenyan nursing students, graduates, interns, and NCK candidates'],
  ['Cadres', 'KRCHN; BScN; Higher Diploma'],
  ['SECTION 2 - VOICE', ''],
  ['Voice', 'Clear, practical, respectful, evidence-led Kenyan nursing education'],
  ['English', 'Kenyan English; retain official terminology from Kenyan authorities'],
  ['Reading Level', 'Plain language; target grade 8-9; no unnecessary jargon'],
  ['Banned Claims', '#1; guaranteed pass; examiner-written; exact DigiProctor replica; NCK approved; verified unless methodology is documented'],
  ['SECTION 3 - AUTHOR AND REVIEW', ''],
  ['Default Author', 'NurseFiti Editorial Team until named authors are approved'],
  ['Clinical Reviewer', 'Named qualified reviewer required before publishing treatment, medicine dose, maternal health, immunisation, mental health, or procedure claims'],
  ['Regulatory Reviewer', 'Named reviewer required for NCK exam, licensing, registration, CPD, accreditation, and internship claims'],
  ['SECTION 4 - SOURCES', ''],
  ['Primary Source Priority', 'NCK; Kenya MOH; KEMSA/KEML; Kenya Law; WHO; peer-reviewed journals; official government notices'],
  ['Source Rule', 'Every external URL must load and directly support the linked claim'],
  ['Minimum External Sources', '3 per general article; 5 per clinical or regulatory article'],
  ['Reddit Rule', 'Use for question language and pain themes only; never as clinical or regulatory evidence'],
  ['Prohibited Sources', 'Competitor marketing claims as authority; fabricated URLs; generic homepages when an exact document exists'],
  ['SECTION 5 - ARTICLE STRUCTURE', ''],
  ['Word Count', '1800-2500 words when the topic supports it; never pad'],
  ['TLDR', '25-45 words near the top'],
  ['Opening', 'Direct answer in the first 1-2 sentences'],
  ['H2 Format', 'Natural questions with an answer-first opening paragraph'],
  ['Key Takeaways', 'Exactly 5 concise actionable items'],
  ['FAQ Count', 'Exactly 8 on-topic questions; screen PAA for duplicates and unsafe questions'],
  ['Tables', 'At least one useful table when comparison, schedule, formula, cadre, or checklist intent warrants it'],
  ['People Also Read', 'Exactly 2 live NurseFiti articles when available; rotate links'],
  ['Last Updated', 'Required and truthful'],
  ['SECTION 6 - SEO AND AEO', ''],
  ['Meta Description', '130-160 characters'],
  ['Title', 'Match the approved Keyword Universe title and search intent'],
  ['Canonical', `${baseUrl}/blog/{slug}`],
  ['Schema', 'BlogPosting; WebPage; BreadcrumbList; FAQPage when visible FAQs exist'],
  ['Internal Links', 'Link relevant public product pages and two related articles; never send unauthenticated readers to private app routes'],
  ['SECTION 7 - SAFETY', ''],
  ['Never Invent', 'Exam dates; exam structure; fees; pass rates; candidate counts; licensing deadlines; medicine doses; clinical protocols; testimonials; tutor credentials'],
  ['Time-sensitive Content', 'Must include a verification date and exact current primary source'],
  ['Clinical Disclaimer', 'Educational information only; not a substitute for clinical judgement, institutional policy, or qualified supervision'],
  ['Publish Gate', 'Zero blockers; human admin is the only publisher'],
  ['Automation Permission', 'Create or update drafts only; publishing is technically prohibited'],
];

const sitemap = [
  ['URL', 'Type', 'Status'],
  [baseUrl, 'Core Page', 'Live'],
  [`${baseUrl}/about`, 'Core Page', 'Live'],
  [`${baseUrl}/blog`, 'Blog Index', 'Live'],
  [`${baseUrl}/pricing`, 'Commercial Page', 'Ready locally'],
  [`${baseUrl}/practice-questions`, 'Product Page', 'Ready locally'],
  [`${baseUrl}/mock-exams`, 'Product Page', 'Ready locally'],
  [`${baseUrl}/nck-flashcards`, 'Product Page', 'Ready locally'],
  [`${baseUrl}/revision-plans`, 'Product Page', 'Ready locally'],
  [`${baseUrl}/tutoring`, 'Service Page', 'Ready locally'],
  [`${baseUrl}/help`, 'Support Page', 'Live'],
  [`${baseUrl}/privacy`, 'Legal Page', 'Live'],
  [`${baseUrl}/terms`, 'Legal Page', 'Live'],
];

const publishedHeaders = [[
  'blog_id', 'target_date', 'month', 'status', 'cms_status', 'keyword', 'title',
  'slug', 'draft_doc_link', 'cms_draft_id', 'live_url', 'cluster', 'cluster_role',
  'content_audience', 'internal_links', 'external_links', 'faq_count',
  'schema_included', 'audit_score', 'blocker_count', 'warning_count',
  'generation_run_id', 'prompt_version', 'notes',
]];

const existingPosts = [
  ['2026-06-27', 'moh nursing internship deployment kenya 2026', 'Ministry of Health 2026 Internship Deployment: What You Must Do By June 29', 'moh-nursing-internship-deployment-kenya-2026', 'NCK News'],
  ['2026-06-27', 'nck may 2026 exam results', 'NCK May 2026 Exam Results Released: How to Check (2026)', 'nck-may-2026-exam-results-released', 'NCK News'],
  ['2026-06-25', 'nck unaccredited colleges warning', 'NCK Exam Warning 2026: The Unaccredited College Alert You Must Know', 'nck-exam-warning-unaccredited-colleges-kenya-2026', 'NCK News'],
  ['2026-06-25', 'nck june 2026 update', 'NCK June 2026 Update: Exam Results, May Cycle Wrap-up and Unaccredited College Warning', 'nck-june-2026-update', 'NCK News'],
  ['2026-06-25', 'nursefiti for nursing students', 'NurseFiti Is Not Just for NCK Exam Prep - It Works for Undergrads Too', 'nursefiti-for-nursing-students-undergrads', 'Study Guide'],
  ['2026-06-21', 'fathers day appreciation', 'The Unsung Heroes: Celebrating the Significance of Dads this Father\'s Day', 'fathers-day-appreciation-dads-role', 'Community'],
  ['2026-06-20', 'study for nck exam while working', 'How to Study for NCK Exam While Working as an Intern (2026)', 'nck-exam-study-internship-guide', 'Study Strategy'],
  ['2026-06-15', 'nck august 2026 exam preparation', 'NCK August 2026 Exam: Dates, Registration and 8-Week Prep', 'nck-august-2026-exam-prep-plan', 'NCK News'],
  ['2026-06-05', 'nck latest news june 2026', 'NCK June 2026: Feb Results, May Exam and Unaccredited College Warning', 'nck-latest-news-june-2026', 'NCK News'],
  ['2026-05-01', 'nck exam preparation guide kenya', 'NCK Exam Preparation Guide: Pass First Attempt (2026)', 'nck-exam-preparation-guide-kenya', 'Study Guide'],
  ['2026-05-05', 'krchn exam revision tips', 'KRCHN Exam: How to Pass Paper I and Paper II (2026)', 'krchn-exam-revision-tips', 'KRCHN'],
  ['2026-05-10', 'bscn nck exam kenya', 'BScN NCK Exam: High-Yield Topics and 6-Week Study Plan (2026)', 'bscn-nursing-exam-kenya', 'BScN'],
  ['2026-05-15', 'nck past papers practice', 'NCK Past Papers: How to Use Them (Most Students Get This Wrong)', 'nck-past-papers-practice', 'Study Strategy'],
  ['2026-05-20', 'digiproctor nck exam guide', 'DigiProctor NCK Exam Interface: What to Expect (2026)', 'digiproctor-nck-exam-guide', 'Exam Day'],
  ['2026-06-08', 'nck exam anxiety', 'NCK Exam Anxiety: 7 Evidence-Based Strategies That Work (2026)', 'nck-exam-anxiety-how-to-manage-it', 'Study Strategy'],
  ['2026-06-09', 'nck pharmacology calculations', 'NCK Pharmacology and Drug Calculations: Complete Guide (2026)', 'nck-pharmacology-calculations-guide', 'Study Guide'],
  ['2026-06-24', 'apply for nck practising licence', 'How to Apply for the NCK Practising Licence After Passing (2026)', 'how-to-apply-nck-licence-kenya', 'Study Guide'],
  ['2026-07-07', 'nursing politics leadership kenya', 'Nursing and Politics in Kenya: Leadership Opportunities for Practitioners (2026)', 'nursing-politics-leadership-kenya', 'Community'],
  ['2026-07-07', 'nursing forums networks kenya', 'The Ultimate Guide to Nursing Forums and Networks in Kenya (2026)', 'nursing-forums-networks-kenya', 'Community'],
];

const publishedRows = existingPosts.map(([date, keyword, title, slug, cluster], index) => [
  `NF-${String(index + 1).padStart(3, '0')}`, date,
  new Date(`${date}T00:00:00Z`).toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase(),
  'Published', 'Legacy', keyword, title, slug, '', '', `${baseUrl}/blog/${slug}`,
  cluster, 'Existing', 'student', '', '', '', 'Yes', '', '', '', '', 'legacy-v1',
  'Existing code-backed article; migrate and audit before retiring fallback.',
]);

const stats = [
  ['month', 'target', 'published', 'drafts', 'scheduled', 'pending', 'failed_audit', 'completion_rate'],
  ['Jul 2026', 0, 2, 0, 0, 0, 0, '=IF(B2=0,0,C2/B2)'],
];

const info = [
  ['FIELD', 'VALUE'],
  ['Property', 'NurseFiti'],
  ['Domain', baseUrl],
  ['Blog URL', `${baseUrl}/blog`],
  ['CMS', 'Native NurseFiti Blog CMS'],
  ['CMS Admin', `${baseUrl}/admin/blog`],
  ['Publishing Rule', 'AI orchestration creates drafts only; human admin publishes'],
  ['Keyword Universe', `https://docs.google.com/spreadsheets/d/${keywordSheet}/edit`],
  ['Drive Folder', 'https://drive.google.com/drive/folders/1YMqPQDYIZgHXGliap9cMJ2X5KVOU5HAt'],
  ['Blog Drafts Folder', `https://drive.google.com/drive/folders/${draftFolder}`],
  ['Audit Reports Folder', `https://drive.google.com/drive/folders/${auditFolder}`],
  ['Research Sources Folder', `https://drive.google.com/drive/folders/${researchFolder}`],
  ['Orchestrator', 'Custom Node.js/TypeScript worker; no n8n'],
  ['Status', 'Control sheets created; orchestrator not yet built'],
];

update(keywordSheet, 'Keyword Universe!A1:T1', keywordHeaders);
update(keywordSheet, `Methodology!A1:B${methodology.length}`, methodology);
update(keywordSheet, `Guardrails!A1:B${guardrails.length}`, guardrails);
update(keywordSheet, `Sitemap!A1:C${sitemap.length}`, sitemap);
update(publishedSheet, 'Blogs!A1:X1', publishedHeaders);
update(publishedSheet, `Blogs!A2:X${publishedRows.length + 1}`, publishedRows);
update(publishedSheet, `Stats!A1:H${stats.length}`, stats);
update(publishedSheet, `Info!A1:B${info.length}`, info);

const headerFormat = JSON.stringify({
  backgroundColor: { red: 0.031, green: 0.318, blue: 0.31 },
  textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
  horizontalAlignment: 'CENTER',
  verticalAlignment: 'MIDDLE',
  wrapStrategy: 'WRAP',
});

for (const [sheetId, range] of [
  [keywordSheet, 'Keyword Universe!A1:T1'],
  [keywordSheet, 'Methodology!A1:B1'],
  [keywordSheet, 'Guardrails!A1:B1'],
  [keywordSheet, 'Sitemap!A1:C1'],
  [publishedSheet, 'Blogs!A1:X1'],
  [publishedSheet, 'Stats!A1:H1'],
  [publishedSheet, 'Info!A1:B1'],
]) {
  run([
    'sheets', 'format', sheetId, range,
    '--format-json', headerFormat,
    '--format-fields', 'backgroundColor,textFormat,horizontalAlignment,verticalAlignment,wrapStrategy',
  ], `Formatted ${range}`);
}

for (const [sheetId, sheet] of [
  [keywordSheet, 'Keyword Universe'],
  [keywordSheet, 'Guardrails'],
  [publishedSheet, 'Blogs'],
  [publishedSheet, 'Stats'],
]) {
  run(['sheets', 'freeze', sheetId, '--sheet', sheet, '--rows', '1'], `Froze ${sheet}`);
}

for (const [sheetId, columns, width] of [
  [keywordSheet, 'Keyword Universe!A:A', '90'],
  [keywordSheet, 'Keyword Universe!B:B', '220'],
  [keywordSheet, 'Keyword Universe!C:C', '360'],
  [keywordSheet, 'Keyword Universe!J:K', '420'],
  [keywordSheet, 'Keyword Universe!S:T', '240'],
  [keywordSheet, 'Guardrails!A:A', '240'],
  [keywordSheet, 'Guardrails!B:B', '700'],
  [publishedSheet, 'Blogs!A:F', '120'],
  [publishedSheet, 'Blogs!G:G', '420'],
  [publishedSheet, 'Blogs!H:H', '280'],
  [publishedSheet, 'Blogs!I:K', '260'],
  [publishedSheet, 'Blogs!X:X', '420'],
]) {
  run(['sheets', 'resize-columns', sheetId, columns, '--width', width], `Resized ${columns}`);
}

console.log(`Keyword Universe: https://docs.google.com/spreadsheets/d/${keywordSheet}/edit`);
console.log(`Published Blogs: https://docs.google.com/spreadsheets/d/${publishedSheet}/edit`);
