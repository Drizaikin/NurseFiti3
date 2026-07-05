'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';

interface BreakdownItem { emoji: string; phrase: string; meaning: string; }

interface Mnemonic {
  id: string;
  title: string;
  category: string;
  specialty: string;
  tags: string[];
  phrases: string[];
  breakdown: BreakdownItem[];
  clinical_significance: string;
  causes: string;        // comma-separated in form; stored as array
  exam_traps: string;
  memory_pearl: string;
  high_yield_tip: string;
  practice_question: string; // JSON string in form
  created_at?: string;
}

const EMPTY: Mnemonic = {
  id: '', title: '', category: 'Pharmacology', specialty: 'General',
  tags: [], phrases: [], breakdown: [],
  clinical_significance: '', causes: '', exam_traps: '',
  memory_pearl: '', high_yield_tip: '', practice_question: '',
};

const CATEGORIES = ['Pharmacology','Anatomy','Obstetrics','Neurology','Med-Surgical','Emergency','Community','Pediatrics'];
const SPECIALTIES = ['Cardiovascular','Respiratory','Neurology','Pharmacology','Endocrine','Electrolytes','Pediatrics','Maternity','Infectious Diseases','Emergency Nursing','Musculoskeletal','Mental Health','Wound Care','General'];

export default function AdminMnemonicsPage() {
  const supabase = createClient();
  const [mnemonics, setMnemonics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Mnemonic>(EMPTY);
  const [tagInput, setTagInput] = useState('');
  const [pqError, setPqError] = useState('');

  useEffect(() => { fetchMnemonics(); }, []);

  const fetchMnemonics = async () => {
    try {
      const { data, error } = await supabase.from('mnemonics').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setMnemonics(data || []);
    } catch (err: any) {
      toast.error('Failed to load mnemonics: ' + err.message);
    } finally { setIsLoading(false); }
  };

  const handleAddBreakdown = () => {
    setFormData({ ...formData, breakdown: [...formData.breakdown, { emoji: '✨', phrase: '', meaning: '' }] });
  };

  const handleUpdateBreakdown = (index: number, field: keyof BreakdownItem, value: string) => {
    const updated = [...formData.breakdown];
    updated[index][field] = value;
    const phrases = updated.map(b => b.phrase.split('—')[0].trim()).filter(Boolean);
    setFormData({ ...formData, breakdown: updated, phrases });
  };

  const handleRemoveBreakdown = (index: number) => {
    const updated = formData.breakdown.filter((_, i) => i !== index);
    const phrases = updated.map(b => b.phrase.split('—')[0].trim()).filter(Boolean);
    setFormData({ ...formData, breakdown: updated, phrases });
  };

  const validatePQ = (val: string) => {
    if (!val.trim()) return true; // optional
    try { JSON.parse(val); setPqError(''); return true; }
    catch { setPqError('Invalid JSON. Must be valid JSON object.'); return false; }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePQ(formData.practice_question)) return;
    setIsSubmitting(true);
    try {
      const payload: any = {
        title: formData.title,
        category: formData.category,
        specialty: formData.specialty,
        tags: formData.tags,
        phrases: formData.phrases,
        breakdown: formData.breakdown,
        clinical_significance: formData.clinical_significance,
        causes: formData.causes.split(',').map(s => s.trim()).filter(Boolean),
        exam_traps: formData.exam_traps,
        memory_pearl: formData.memory_pearl,
        high_yield_tip: formData.high_yield_tip,
        practice_question: formData.practice_question.trim()
          ? JSON.parse(formData.practice_question)
          : {},
      };
      if (formData.id) {
        const { error } = await (supabase as any).from('mnemonics').update(payload).eq('id', formData.id);
        if (error) throw error;
        toast.success('Mnemonic updated');
      } else {
        const { error } = await (supabase as any).from('mnemonics').insert([payload]);
        if (error) throw error;
        toast.success('Mnemonic created');
      }
      setIsModalOpen(false);
      fetchMnemonics();
    } catch (err: any) { toast.error(err.message); }
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this mnemonic?')) return;
    try {
      const { error } = await supabase.from('mnemonics').delete().eq('id', id);
      if (error) throw error;
      toast.success('Deleted');
      fetchMnemonics();
    } catch (err: any) { toast.error('Failed: ' + err.message); }
  };

  const openModal = (m?: any) => {
    if (m) {
      setFormData({
        id: m.id, title: m.title, category: m.category || 'Pharmacology',
        specialty: m.specialty || 'General', tags: m.tags || [], phrases: m.phrases || [],
        breakdown: m.breakdown || [],
        clinical_significance: m.clinical_significance || '',
        causes: (m.causes || []).join(', '),
        exam_traps: m.exam_traps || '',
        memory_pearl: m.memory_pearl || '',
        high_yield_tip: m.high_yield_tip || '',
        practice_question: m.practice_question ? JSON.stringify(m.practice_question, null, 2) : '',
      });
      setTagInput((m.tags || []).join(', '));
    } else {
      setFormData(EMPTY);
      setTagInput('');
    }
    setPqError('');
    setIsModalOpen(true);
  };

  const input = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none";
  const label = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

  if (isLoading) return <div className="p-8 text-center text-gray-400 font-body">Loading mnemonics…</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-primary">Mnemonic Library</h1>
          <p className="text-neutral-mid text-sm mt-1 font-body">{mnemonics.length} mnemonics · 7-section spec format</p>
        </div>
        <button onClick={() => openModal()}
          className="bg-primary hover:bg-primary-mid text-white px-4 py-2 rounded-xl text-sm font-heading font-bold transition-colors">
          + Add Mnemonic
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[var(--color-border)] overflow-hidden">
        <table className="min-w-full divide-y divide-[var(--color-border)]">
          <thead className="bg-[var(--color-primary-xlight)]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-heading font-bold text-primary uppercase tracking-wider">Title / Specialty</th>
              <th className="px-6 py-3 text-left text-xs font-heading font-bold text-primary uppercase tracking-wider">Mnemonic Preview</th>
              <th className="px-6 py-3 text-left text-xs font-heading font-bold text-primary uppercase tracking-wider">Sections</th>
              <th className="px-6 py-3 text-right text-xs font-heading font-bold text-primary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {mnemonics.map((m) => (
              <tr key={m.id} className="hover:bg-[var(--color-primary-xlight)] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-heading font-bold text-[var(--color-dark)] text-sm">{m.title}</div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 bg-[var(--color-accent-light)] text-[var(--color-accent-dark)] rounded-full font-bold">{m.category}</span>
                    {m.specialty && <span className="text-[10px] px-2 py-0.5 bg-[var(--color-primary-light)] text-primary rounded-full font-bold">{m.specialty}</span>}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <div className="font-body text-sm text-[var(--color-neutral-mid)]">
                    {(m.breakdown || []).slice(0, 2).map((b: BreakdownItem, i: number) => (
                      <div key={i} className="truncate">{b.emoji} {b.phrase}</div>
                    ))}
                    {(m.breakdown?.length || 0) > 2 && (
                      <div className="text-xs text-[var(--color-neutral-light)] mt-0.5">+{m.breakdown.length - 2} more items</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {[
                      { key: 'clinical_significance', label: 'Clinical' },
                      { key: 'exam_traps', label: 'Exam Traps' },
                      { key: 'memory_pearl', label: 'Pearl' },
                      { key: 'high_yield_tip', label: 'Tip' },
                      { key: 'practice_question', label: 'PQ' },
                    ].map(({ key, label: lbl }) => (
                      <span key={key} className={`text-[10px] px-2 py-0.5 rounded-full font-bold inline-block w-fit
                        ${m[key] && (typeof m[key] === 'string' ? m[key].length > 0 : Object.keys(m[key]).length > 0)
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-400'
                        }`}>
                        {lbl}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button onClick={() => openModal(m)} className="text-primary hover:text-primary-mid font-semibold mr-4 font-body">Edit</button>
                  <button onClick={() => handleDelete(m.id)} className="text-error hover:text-red-700 font-semibold font-body">Delete</button>
                </td>
              </tr>
            ))}
            {mnemonics.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-[var(--color-neutral-mid)] font-body">No mnemonics yet. Add your first one!</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Modal ─────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col">
            {/* Modal header */}
            <div className="px-6 py-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-primary-xlight)]">
              <div>
                <h3 className="font-heading font-extrabold text-primary text-lg">{formData.id ? 'Edit' : 'New'} Mnemonic</h3>
                <p className="font-body text-xs text-[var(--color-neutral-mid)] mt-0.5">All 7 sections of the NurseFiti Spec</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-neutral-mid)] hover:text-[var(--color-dark)] text-2xl leading-none">&times;</button>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              <form id="mnemonic-form" onSubmit={handleSubmit} className="space-y-5">

                {/* Row 1: title + category + specialty */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className={label}>Topic Title *</label>
                    <input required type="text" value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      className={input} placeholder="e.g., APGAR Score" />
                  </div>
                  <div>
                    <label className={label}>Category *</label>
                    <select value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className={input}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={label}>Specialty *</label>
                    <select value={formData.specialty}
                      onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                      className={input}>
                      {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className={label}>Tags (comma-separated)</label>
                  <input type="text" value={tagInput}
                    onChange={e => {
                      setTagInput(e.target.value);
                      setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) });
                    }}
                    className={input} placeholder="Toxicology, Emergency, Pharmacology" />
                </div>

                {/* Breakdown */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={label}>🧠 Breakdown &amp; Phrases (Section 1 &amp; 2)</label>
                    <button type="button" onClick={handleAddBreakdown}
                      className="text-xs font-heading font-bold text-primary hover:text-primary-mid">+ Add Item</button>
                  </div>
                  {formData.breakdown.length === 0 ? (
                    <div className="text-center py-6 border-2 border-dashed border-[var(--color-border)] rounded-xl text-[var(--color-neutral-mid)] text-sm font-body">
                      No items yet — click "+ Add Item"
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {formData.breakdown.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-start bg-[var(--color-primary-xlight)] p-3 rounded-xl border border-[var(--color-border)]">
                          <input type="text" value={item.emoji}
                            onChange={e => handleUpdateBreakdown(idx, 'emoji', e.target.value)}
                            className="w-12 text-center border border-[var(--color-border)] rounded-lg px-1 py-2 text-lg outline-none bg-white" placeholder="😀" required />
                          <div className="flex-1 space-y-2">
                            <input type="text" value={item.phrase}
                              onChange={e => handleUpdateBreakdown(idx, 'phrase', e.target.value)}
                              className={`${input} font-bold text-primary`} placeholder="Phrase (e.g. Dry as a bone)" required />
                            <textarea value={item.meaning}
                              onChange={e => handleUpdateBreakdown(idx, 'meaning', e.target.value)}
                              className={`${input} h-14 resize-none`} placeholder="Meaning / explanation" required />
                          </div>
                          <button type="button" onClick={() => handleRemoveBreakdown(idx)}
                            className="text-error hover:text-red-700 p-2 text-lg leading-none">&times;</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-[var(--color-neutral-light)] mt-1.5 font-body">Phrases array is auto-generated from breakdown.</p>
                </div>

                {/* Section divider */}
                <div className="border-t border-[var(--color-border)] pt-4">
                  <p className="text-xs font-heading font-bold text-[var(--color-neutral-mid)] uppercase tracking-widest mb-4">Rich Sections (Sections 3–7)</p>
                </div>

                {/* Clinical Significance */}
                <div>
                  <label className={label}>🩺 Clinical Significance</label>
                  <textarea value={formData.clinical_significance}
                    onChange={e => setFormData({ ...formData, clinical_significance: e.target.value })}
                    className={`${input} h-20 resize-none`}
                    placeholder="Where is this used clinically? Why does it matter?" />
                </div>

                {/* Causes */}
                <div>
                  <label className={label}>💊 Common Causes / Associated Conditions (comma-separated)</label>
                  <textarea value={formData.causes}
                    onChange={e => setFormData({ ...formData, causes: e.target.value })}
                    className={`${input} h-16 resize-none`}
                    placeholder="Atropine, Scopolamine, Diphenhydramine, Amitriptyline" />
                </div>

                {/* Exam Traps */}
                <div>
                  <label className={label}>⚠️ Common NCK Exam Traps</label>
                  <textarea value={formData.exam_traps}
                    onChange={e => setFormData({ ...formData, exam_traps: e.target.value })}
                    className={`${input} h-20 resize-none`}
                    placeholder="What do students commonly confuse? What mistakes are made in exams?" />
                </div>

                {/* Memory Pearl */}
                <div>
                  <label className={label}>💡 NurseFiti Memory Pearl</label>
                  <input type="text" value={formData.memory_pearl}
                    onChange={e => setFormData({ ...formData, memory_pearl: e.target.value })}
                    className={input} placeholder={`"No sweat. Can't see. Burning hot." — Think Anticholinergic.`} />
                </div>

                {/* High-Yield Tip */}
                <div>
                  <label className={label}>🎯 NCK High-Yield Tip</label>
                  <textarea value={formData.high_yield_tip}
                    onChange={e => setFormData({ ...formData, high_yield_tip: e.target.value })}
                    className={`${input} h-16 resize-none`}
                    placeholder="The key exam takeaway — what should students do when they see these signs?" />
                </div>

                {/* Practice Question */}
                <div>
                  <label className={label}>❓ Practice Question (JSON)</label>
                  <textarea value={formData.practice_question}
                    onChange={e => { setFormData({ ...formData, practice_question: e.target.value }); validatePQ(e.target.value); }}
                    className={`${input} h-40 resize-none font-mono text-xs ${pqError ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                    placeholder={`{\n  "question": "A patient presents with...",\n  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],\n  "answer": "B",\n  "explanation": "Because..."\n}`} />
                  {pqError && <p className="text-xs text-error mt-1 font-body">{pqError}</p>}
                  <p className="text-xs text-[var(--color-neutral-light)] mt-1 font-body">Leave blank to skip. Must be valid JSON with: question, options[], answer, explanation.</p>
                </div>

              </form>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-[var(--color-border)] flex justify-end gap-3 bg-[var(--color-primary-xlight)]">
              <button type="button" onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-[var(--color-border)] rounded-xl text-[var(--color-dark)] hover:bg-white font-body text-sm">
                Cancel
              </button>
              <button type="submit" form="mnemonic-form" disabled={isSubmitting}
                className="px-5 py-2 bg-primary text-white rounded-xl hover:bg-primary-mid disabled:opacity-50 font-heading font-bold text-sm transition-colors">
                {isSubmitting ? 'Saving…' : 'Save Mnemonic'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
