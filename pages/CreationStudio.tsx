import React, { useState, useEffect } from 'react';
import { PostType, Platform, ViralCritique } from '../types';
import { generateCarouselImages, calculateSmartSchedule } from '../services/mockBackend';
import { getViralScore, repurposeContent } from '../services/geminiService';
import { CarouselPreview } from '../components/CarouselPreview';
import { ViralScoreWidget } from '../components/ViralScoreWidget';
import { Layout, Smartphone, Calendar, Wand2, Image as ImageIcon, Type, Send, Youtube, RefreshCw } from 'lucide-react';

export const CreationStudio: React.FC = () => {
  // State
  const [platform, setPlatform] = useState<Platform>('linkedin');
  const [postType, setPostType] = useState<PostType>('post');
  const [content, setContent] = useState('');
  const [slidesText, setSlidesText] = useState<string[]>(['Slide 1 Content', 'Slide 2 Content', 'Slide 3 Content']);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [scheduleMode, setScheduleMode] = useState<'strict' | 'human'>('human');
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);

  // AI State
  const [viralData, setViralData] = useState<ViralCritique | undefined>(undefined);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Repurposing State
  const [repurposeInput, setRepurposeInput] = useState('');
  const [isRepurposing, setIsRepurposing] = useState(false);
  const [showRepurposeModal, setShowRepurposeModal] = useState(false);

  // Effect: Generate Carousel when slides change (debounced)
  useEffect(() => {
    if (postType === 'carousel') {
      const timer = setTimeout(async () => {
        setIsGeneratingImages(true);
        const imgs = await generateCarouselImages(slidesText);
        setGeneratedImages(imgs);
        setIsGeneratingImages(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [slidesText, postType]);

  const handleAnalyze = async () => {
    if (!content) return;
    setIsAnalyzing(true);
    const data = await getViralScore(content, platform);
    setViralData(data);
    setIsAnalyzing(false);
  };

  const handleRepurpose = async () => {
    if (!repurposeInput) return;
    setIsRepurposing(true);
    const result = await repurposeContent(repurposeInput);
    setContent(result);
    setRepurposeInput('');
    setShowRepurposeModal(false);
    setIsRepurposing(false);
  };

  const handleSchedule = () => {
    const time = calculateSmartSchedule(scheduleMode, scheduleDate ? scheduleDate : undefined);
    alert(`Post Scheduled for: ${time.toLocaleString()} (${scheduleMode === 'human' ? 'Human Mode' : 'Strict Mode'})`);
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-6">
      {/* LEFT: Editors */}
      <div className="w-1/2 flex flex-col gap-6 overflow-y-auto pr-2 pb-10">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">Create Post</h1>
            <button 
                onClick={() => setShowRepurposeModal(!showRepurposeModal)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
            >
                <Youtube size={16} /> Repurpose Content
            </button>
        </div>

        {/* Repurpose Modal Area */}
        {showRepurposeModal && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 animate-in fade-in slide-in-from-top-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Paste Video Transcript or Blog Text</label>
                <textarea 
                    className="w-full p-2 text-sm border border-slate-300 rounded-md mb-2 h-24"
                    placeholder="Paste text here..."
                    value={repurposeInput}
                    onChange={(e) => setRepurposeInput(e.target.value)}
                />
                <button 
                    onClick={handleRepurpose}
                    disabled={isRepurposing}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                   {isRepurposing ? <RefreshCw className="animate-spin" size={16} /> : <Wand2 size={16} />} 
                   Generate LinkedIn Post
                </button>
            </div>
        )}

        {/* Platform & Type Select */}
        <div className="flex gap-4">
          <div className="flex p-1 bg-slate-100 rounded-lg">
            {(['linkedin', 'instagram'] as Platform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                  platform === p ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex p-1 bg-slate-100 rounded-lg">
            {(['post', 'carousel'] as PostType[]).map((t) => (
              <button
                key={t}
                onClick={() => setPostType(t)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize flex items-center gap-2 transition-all ${
                  postType === t ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t === 'post' ? <Type size={16} /> : <ImageIcon size={16} />}
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Text Content Editor */}
        <div className="space-y-2">
            <div className="flex justify-between">
                <label className="block text-sm font-medium text-slate-700">Caption / Content</label>
                <ViralScoreWidget data={viralData} isLoading={isAnalyzing} onAnalyze={handleAnalyze} />
            </div>
            <textarea
                className="w-full h-40 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none text-slate-700"
                placeholder="Write your viral masterpiece..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>

        {/* Carousel Editor */}
        {postType === 'carousel' && (
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Carousel Slides</h3>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Feature A: Pillow -> Canvas</span>
            </div>
            {slidesText.map((text, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-slate-400 font-mono pt-2">{idx + 1}.</span>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => {
                    const newSlides = [...slidesText];
                    newSlides[idx] = e.target.value;
                    setSlidesText(newSlides);
                  }}
                  className="flex-1 p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder={`Slide ${idx + 1} text`}
                />
                <button 
                    onClick={() => {
                        const newSlides = slidesText.filter((_, i) => i !== idx);
                        setSlidesText(newSlides);
                    }}
                    className="text-slate-400 hover:text-red-500"
                >
                    &times;
                </button>
              </div>
            ))}
            <button
              onClick={() => setSlidesText([...slidesText, 'New Slide'])}
              className="text-sm text-purple-600 font-medium hover:underline"
            >
              + Add Slide
            </button>
          </div>
        )}

        {/* Scheduling Logic */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} className="text-slate-500"/>
                <h3 className="font-semibold text-slate-700">Smart Scheduler</h3>
            </div>
            
            <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name="mode" 
                        checked={scheduleMode === 'human'} 
                        onChange={() => setScheduleMode('human')}
                        className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-slate-700">Human Mode (Randomized)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name="mode" 
                        checked={scheduleMode === 'strict'} 
                        onChange={() => setScheduleMode('strict')}
                        className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-slate-700">Strict Mode</span>
                </label>
            </div>

            <button 
                onClick={handleSchedule}
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors flex justify-center items-center gap-2"
            >
                <Send size={18} /> Schedule Post
            </button>
        </div>
      </div>

      {/* RIGHT: Live Preview */}
      <div className="w-1/2 bg-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center relative border border-slate-200 overflow-hidden">
        <div className="absolute top-4 right-4 text-xs text-slate-400 font-mono">LIVE PREVIEW</div>
        
        {/* Phone Mockup */}
        <div className="w-[380px] h-[750px] bg-white rounded-[3rem] shadow-2xl border-8 border-slate-900 overflow-hidden relative flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-10"></div>
            
            {/* Phone Header */}
            <div className="bg-slate-50 border-b border-slate-100 p-4 pt-10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-blue-400"></div>
                <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">OmniUser</p>
                    <p className="text-[10px] text-slate-500">Sponsored • SaaS</p>
                </div>
            </div>

            {/* Phone Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
                {postType === 'carousel' ? (
                     <div className="w-full aspect-square bg-slate-100 relative">
                        {/* Simulate Horizontal Scroll for Preview */}
                        <div className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                            {isGeneratingImages ? (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">Rendering...</div>
                            ) : (
                                generatedImages.map((img, i) => (
                                    <img key={i} src={img} className="w-full h-full object-cover shrink-0 snap-center" alt="" />
                                ))
                            )}
                        </div>
                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                            {slidesText.map((_, i) => (
                                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-white/50'}`}></div>
                            ))}
                        </div>
                     </div>
                ) : (
                    <div className="w-full aspect-square bg-slate-100 flex items-center justify-center text-slate-400 text-sm p-8 text-center">
                        Image/Video Placeholder
                    </div>
                )}

                {/* Actions Row */}
                <div className="p-3 flex gap-4 text-slate-800">
                    <div className="w-5 h-5 border-2 border-slate-800 rounded-full"></div> {/* Like */}
                    <div className="w-5 h-5 border-2 border-slate-800 rounded-full"></div> {/* Comment */}
                    <div className="w-5 h-5 border-2 border-slate-800 rounded-full ml-auto"></div> {/* Save */}
                </div>

                {/* Caption */}
                <div className="px-3 pb-8">
                    <p className="text-sm text-slate-900">
                        <span className="font-bold mr-2">OmniUser</span>
                        {content || "Your caption will appear here..."}
                    </p>
                    <p className="text-xs text-blue-800 mt-1">#marketing #ai #omnipost</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
