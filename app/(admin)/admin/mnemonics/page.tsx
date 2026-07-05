'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';

interface Mnemonic {
  id: string;
  title: string;
  acronym: string;
  description: string;
  created_at: string;
}

export default function AdminMnemonicsPage() {
  const supabase = createClient();
  const [mnemonics, setMnemonics] = useState<Mnemonic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    acronym: '',
    description: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.id) {
        // Update
        const { error } = await supabase
          .from('mnemonics')
          .update({
            title: formData.title,
            acronym: formData.acronym,
            description: formData.description
          })
          .eq('id', formData.id);
        
        if (error) throw error;
        toast.success('Mnemonic updated successfully');
      } else {
        // Create
        const { error } = await supabase
          .from('mnemonics')
          .insert([{
            title: formData.title,
            acronym: formData.acronym,
            description: formData.description
          }]);
        
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
    } else {
      setFormData({ id: '', title: '', acronym: '', description: '' });
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Acronym</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mnemonics.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{m.title}</div>
                  <div className="text-sm text-gray-500">{m.acronym}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 whitespace-pre-wrap max-w-xl line-clamp-2" title={m.description}>
                    {m.description}
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                {formData.id ? 'Edit Mnemonic' : 'New Mnemonic'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Acronym</label>
                  <input
                    required
                    type="text"
                    value={formData.acronym}
                    onChange={(e) => setFormData({...formData, acronym: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g., Appearance, Pulse, Grimace, Activity, Respiration"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Provide a detailed description or explanation..."
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Mnemonic'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
