'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';

interface BreakdownItem {
  emoji: string;
  phrase: string;
  meaning: string;
}

interface Mnemonic {
  id: string;
  title: string;
  category: string;
  tags: string[];
  phrases: string[];
  breakdown: BreakdownItem[];
  created_at?: string;
}

const CATEGORIES = ["Pharmacology", "Anatomy", "Obstetrics", "Neurology", "Med-Surgical", "Emergency", "Community", "Pediatrics"];

export default function AdminMnemonicsPage() {
  const supabase = createClient();
  const [mnemonics, setMnemonics] = useState<Mnemonic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<Mnemonic>({
    id: '',
    title: '',
    category: 'Pharmacology',
    tags: [],
    phrases: [],
    breakdown: []
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchMnemonics();
  }, []);

  const fetchMnemonics = async () => {
    try {
      const { data, error } = await supabase
        .from('mnemonics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMnemonics(data || []);
    } catch (err: any) {
      toast.error('Failed to load mnemonics: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBreakdown = () => {
    setFormData({
      ...formData,
      breakdown: [...formData.breakdown, { emoji: '✨', phrase: '', meaning: '' }]
    });
  };

  const handleUpdateBreakdown = (index: number, field: keyof BreakdownItem, value: string) => {
    const updated = [...formData.breakdown];
    updated[index][field] = value;
    
    // Automatically extract phrases from breakdown items for the 'phrases' array
    const phrases = updated.map(b => b.phrase.split('—')[0].trim()).filter(Boolean);
    
    setFormData({ ...formData, breakdown: updated, phrases });
  };

  const handleRemoveBreakdown = (index: number) => {
    const updated = formData.breakdown.filter((_, i) => i !== index);
    const phrases = updated.map(b => b.phrase.split('—')[0].trim()).filter(Boolean);
    setFormData({ ...formData, breakdown: updated, phrases });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        tags: formData.tags,
        phrases: formData.phrases,
        breakdown: formData.breakdown
      };

      if (formData.id) {
        // Update
        const { error } = await supabase
          .from('mnemonics')
          .update(payload)
          .eq('id', formData.id);
        
        if (error) throw error;
        toast.success('Mnemonic updated successfully');
      } else {
        // Create
        const { error } = await supabase
          .from('mnemonics')
          .insert([payload]);
        
        if (error) throw error;
        toast.success('Mnemonic created successfully');
      }

      setIsModalOpen(false);
      fetchMnemonics();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this mnemonic?')) return;
    
    try {
      const { error } = await supabase
        .from('mnemonics')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Mnemonic deleted');
      fetchMnemonics();
    } catch (err: any) {
      toast.error('Failed to delete: ' + err.message);
    }
  };

  const openModal = (mnemonic?: Mnemonic) => {
    if (mnemonic) {
      setFormData(mnemonic);
      setTagInput(mnemonic.tags?.join(', ') || '');
    } else {
      setFormData({ id: '', title: '', category: 'Pharmacology', tags: [], phrases: [], breakdown: [] });
      setTagInput('');
    }
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading mnemonics...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mnemonic of The Day</h1>
          <p className="text-gray-500 text-sm mt-1">Manage the database of mnemonics shown to students.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Add Mnemonic
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breakdown Preview</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mnemonics.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{m.title}</div>
                  <div className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded mt-1 inline-block">{m.category}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xl">
                    {m.breakdown?.slice(0,2).map((b, i) => (
                      <div key={i} className="truncate">{b.emoji} {b.phrase}</div>
                    ))}
                    {(m.breakdown?.length || 0) > 2 && <div className="text-xs text-gray-400 mt-1">+{m.breakdown.length - 2} more</div>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openModal(m)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
            {mnemonics.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  No mnemonics found. Add your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                {formData.id ? 'Edit Mnemonic' : 'New Mnemonic'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                &times;
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-6">
              <form id="mnemonic-form" onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Topic Title</label>
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g., APGAR Score"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => {
                      setTagInput(e.target.value);
                      setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)});
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g., Toxicology, Emergency"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Breakdown & Phrases</label>
                    <button type="button" onClick={handleAddBreakdown} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      + Add Item
                    </button>
                  </div>
                  
                  {formData.breakdown.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 text-sm">
                      No breakdown items added yet. Click "+ Add Item".
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.breakdown.map((item, index) => (
                        <div key={index} className="flex gap-2 items-start bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <input
                            type="text"
                            value={item.emoji}
                            onChange={(e) => handleUpdateBreakdown(index, 'emoji', e.target.value)}
                            className="w-12 text-center border border-gray-300 rounded px-1 py-2 text-lg outline-none"
                            placeholder="😀"
                            required
                          />
                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              value={item.phrase}
                              onChange={(e) => handleUpdateBreakdown(index, 'phrase', e.target.value)}
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-bold text-teal-800 outline-none"
                              placeholder="Phrase (e.g. Dry as a bone)"
                              required
                            />
                            <textarea
                              value={item.meaning}
                              onChange={(e) => handleUpdateBreakdown(index, 'meaning', e.target.value)}
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none h-16"
                              placeholder="Meaning / description"
                              required
                            />
                          </div>
                          <button type="button" onClick={() => handleRemoveBreakdown(index)} className="text-red-500 hover:text-red-700 p-2">
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">Note: The top-level 'phrases' array will be automatically generated from the bold phrases above.</p>
                </div>

              </form>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="mnemonic-form"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {isSubmitting ? 'Saving...' : 'Save Mnemonic'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
