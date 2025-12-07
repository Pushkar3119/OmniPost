import React, { useState } from 'react';
import { Trigger } from '../types';
import { MOCK_TRIGGERS } from '../services/mockBackend';
import { Zap, MessageCircle, Plus, Trash2 } from 'lucide-react';

export const Automations: React.FC = () => {
  const [triggers, setTriggers] = useState<Trigger[]>(MOCK_TRIGGERS);
  const [newKeyword, setNewKeyword] = useState('');
  const [newResponse, setNewResponse] = useState('');

  const handleAdd = () => {
    if (!newKeyword || !newResponse) return;
    const newTrigger: Trigger = {
      id: Date.now().toString(),
      keyword: newKeyword.toUpperCase(),
      response: newResponse,
      active: true
    };
    setTriggers([...triggers, newTrigger]);
    setNewKeyword('');
    setNewResponse('');
  };

  const handleDelete = (id: string) => {
    setTriggers(triggers.filter(t => t.id !== id));
  };

  const toggleActive = (id: string) => {
    setTriggers(triggers.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Zap className="text-yellow-500" /> Magic DM Automation
        </h1>
        <p className="text-slate-500 mt-2">
          Automatically DM users who comment specific keywords on your posts. 
          This mimics the functionality of tools like ManyChat.
        </p>
      </header>

      {/* Input Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Create New Trigger</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Trigger Keyword</label>
                <input 
                    type="text" 
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="e.g. PRICE"
                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Auto-DM Response</label>
                <input 
                    type="text" 
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder="e.g. Check your DMs for the link!"
                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
                />
            </div>
        </div>
        <button 
            onClick={handleAdd}
            className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 flex items-center gap-2"
        >
            <Plus size={16} /> Add Automation
        </button>
      </div>

      {/* List Section */}
      <div className="space-y-4">
        {triggers.map((trigger) => (
            <div key={trigger.id} className={`p-4 rounded-xl border flex items-center justify-between transition-all ${trigger.active ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100 opacity-70'}`}>
                <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${trigger.active ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-400'}`}>
                        <MessageCircle size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">"{trigger.keyword}"</span>
                            {!trigger.active && <span className="text-xs text-slate-400">(Inactive)</span>}
                        </div>
                        <p className="text-sm text-slate-600 mt-1">Reply: {trigger.response}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={trigger.active} onChange={() => toggleActive(trigger.id)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                    <button 
                        onClick={() => handleDelete(trigger.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        ))}

        {triggers.length === 0 && (
            <div className="text-center py-10 text-slate-400">
                No active automations.
            </div>
        )}
      </div>
    </div>
  );
};
