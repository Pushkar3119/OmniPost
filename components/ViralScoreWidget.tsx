import React from 'react';
import { ViralCritique } from '../types';
import { AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

interface ViralScoreWidgetProps {
  data?: ViralCritique;
  isLoading: boolean;
  onAnalyze: () => void;
}

export const ViralScoreWidget: React.FC<ViralScoreWidgetProps> = ({ data, isLoading, onAnalyze }) => {
  if (!data && !isLoading) {
    return (
      <button
        onClick={onAnalyze}
        className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
      >
        <Sparkles size={16} />
        Check Viral Score
      </button>
    );
  }

  if (isLoading) {
    return <span className="text-xs text-slate-400 animate-pulse">Analyzing content...</span>;
  }

  if (!data) return null;

  const isGood = data.score >= 70;

  return (
    <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Viral Potential</span>
            {isGood ? (
                <CheckCircle size={16} className="text-green-500" />
            ) : (
                <AlertCircle size={16} className="text-amber-500" />
            )}
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
            isGood ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
        }`}>
            {data.score}/100
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-3">{data.critique}</p>

      {!isGood && (
        <div className="bg-purple-50 p-3 rounded border border-purple-100">
            <p className="text-xs font-semibold text-purple-800 uppercase mb-1">AI Suggested Hook</p>
            <p className="text-sm text-purple-900 italic">"{data.better_hook}"</p>
        </div>
      )}
    </div>
  );
};
