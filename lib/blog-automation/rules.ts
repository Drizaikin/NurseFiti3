import { z } from 'zod';

/** Mirrors public.blog_automation_rules. Every job records the version it ran under. */
export const automationRulesSchema = z.object({
  version: z.number().int().positive(),
  wordCountMin: z.number().int().min(300).max(10000),
  wordCountMax: z.number().int().min(300).max(12000),
  takeawayCount: z.number().int().min(3).max(10),
  faqCount: z.number().int().min(3).max(20),
  minSourcesGeneral: z.number().int().min(1).max(20),
  minSourcesClinical: z.number().int().min(1).max(20),
  metaDescriptionMin: z.number().int().min(50).max(200),
  metaDescriptionMax: z.number().int().min(60).max(200),
  tldrMinWords: z.number().int().min(10).max(100),
  tldrMaxWords: z.number().int().min(15).max(150),
  auditPassScore: z.number().int().min(0).max(100),
  requireTldr: z.boolean(),
  requireReviewerForHighRisk: z.boolean(),
  allowRawHtml: z.boolean(),
  bannedClaims: z.array(z.string().trim().min(2).max(120)).max(60),
  bannedPhrases: z.array(z.string().trim().min(2).max(120)).max(60),
  requiredSections: z.array(z.string().trim().min(2).max(80)).max(20),
  highRiskTerms: z.array(z.string().trim().min(2).max(60)).max(80),
  voiceNotes: z.string().trim().max(2000),
  extraInstructions: z.string().trim().max(4000),
  writerModel: z.string().trim().min(3).max(100),
  temperature: z.number().min(0).max(2),
}).superRefine((rules, ctx) => {
  if (rules.wordCountMax <= rules.wordCountMin) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['wordCountMax'], message: 'Maximum word count must exceed the minimum' });
  }
  if (rules.metaDescriptionMax <= rules.metaDescriptionMin) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['metaDescriptionMax'], message: 'Maximum meta length must exceed the minimum' });
  }
  if (rules.tldrMaxWords <= rules.tldrMinWords) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['tldrMaxWords'], message: 'Maximum TLDR length must exceed the minimum' });
  }
  if (rules.minSourcesClinical < rules.minSourcesGeneral) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['minSourcesClinical'], message: 'Clinical topics cannot need fewer sources than general ones' });
  }
});

export type AutomationRules = z.infer<typeof automationRulesSchema>;

/** Editable subset. version and audit trail columns are server-owned. */
export const rulesUpdateSchema = automationRulesSchema.innerType().omit({ version: true }).extend({
  changeNote: z.string().trim().min(3).max(300),
});

export type RulesUpdate = z.infer<typeof rulesUpdateSchema>;

type RulesRow = {
  version: number;
  word_count_min: number; word_count_max: number; takeaway_count: number; faq_count: number;
  min_sources_general: number; min_sources_clinical: number;
  meta_description_min: number; meta_description_max: number;
  tldr_min_words: number; tldr_max_words: number; audit_pass_score: number;
  require_tldr: boolean; require_reviewer_for_high_risk: boolean; allow_raw_html: boolean;
  banned_claims: string[] | null; banned_phrases: string[] | null;
  required_sections: string[] | null; high_risk_terms: string[] | null;
  voice_notes: string | null; extra_instructions: string | null;
  writer_model: string; temperature: number | string;
};

export function mapRulesRow(row: RulesRow): AutomationRules {
  return automationRulesSchema.parse({
    version: row.version,
    wordCountMin: row.word_count_min,
    wordCountMax: row.word_count_max,
    takeawayCount: row.takeaway_count,
    faqCount: row.faq_count,
    minSourcesGeneral: row.min_sources_general,
    minSourcesClinical: row.min_sources_clinical,
    metaDescriptionMin: row.meta_description_min,
    metaDescriptionMax: row.meta_description_max,
    tldrMinWords: row.tldr_min_words,
    tldrMaxWords: row.tldr_max_words,
    auditPassScore: row.audit_pass_score,
    requireTldr: row.require_tldr,
    requireReviewerForHighRisk: row.require_reviewer_for_high_risk,
    allowRawHtml: row.allow_raw_html,
    bannedClaims: row.banned_claims ?? [],
    bannedPhrases: row.banned_phrases ?? [],
    requiredSections: row.required_sections ?? [],
    highRiskTerms: row.high_risk_terms ?? [],
    voiceNotes: row.voice_notes ?? '',
    extraInstructions: row.extra_instructions ?? '',
    writerModel: row.writer_model,
    temperature: Number(row.temperature),
  });
}

export function rulesUpdateToRow(update: RulesUpdate, userId: string | null) {
  return {
    word_count_min: update.wordCountMin,
    word_count_max: update.wordCountMax,
    takeaway_count: update.takeawayCount,
    faq_count: update.faqCount,
    min_sources_general: update.minSourcesGeneral,
    min_sources_clinical: update.minSourcesClinical,
    meta_description_min: update.metaDescriptionMin,
    meta_description_max: update.metaDescriptionMax,
    tldr_min_words: update.tldrMinWords,
    tldr_max_words: update.tldrMaxWords,
    audit_pass_score: update.auditPassScore,
    require_tldr: update.requireTldr,
    require_reviewer_for_high_risk: update.requireReviewerForHighRisk,
    allow_raw_html: update.allowRawHtml,
    banned_claims: update.bannedClaims,
    banned_phrases: update.bannedPhrases,
    required_sections: update.requiredSections,
    high_risk_terms: update.highRiskTerms,
    voice_notes: update.voiceNotes,
    extra_instructions: update.extraInstructions,
    writer_model: update.writerModel,
    temperature: update.temperature,
    change_note: update.changeNote,
    created_by: userId,
  };
}

export const RULES_SELECTION = 'version, word_count_min, word_count_max, takeaway_count, faq_count, min_sources_general, min_sources_clinical, meta_description_min, meta_description_max, tldr_min_words, tldr_max_words, audit_pass_score, require_tldr, require_reviewer_for_high_risk, allow_raw_html, banned_claims, banned_phrases, required_sections, high_risk_terms, voice_notes, extra_instructions, writer_model, temperature';

/** Builds a case-insensitive matcher for a literal phrase list. */
export function phraseMatcher(phrases: string[]) {
  const escaped = phrases.map(phrase => phrase.trim()).filter(Boolean)
    .map(phrase => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[\s-]+/g, '[\\s-]+'));
  return escaped.length ? new RegExp(escaped.join('|'), 'i') : null;
}

export function highRiskMatcher(terms: string[]) {
  const escaped = terms.map(term => term.trim()).filter(Boolean)
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+'));
  return escaped.length ? new RegExp(`\\b(${escaped.join('|')})\\b`, 'i') : null;
}
