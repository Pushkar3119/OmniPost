import React from 'react';

interface CarouselPreviewProps {
  images: string[];
  isLoading: boolean;
}

export const CarouselPreview: React.FC<CarouselPreviewProps> = ({ images, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-slate-100 rounded-lg animate-pulse">
        <span className="text-slate-400">Generating Carousel...</span>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300">
        <span className="text-slate-400">No slides generated yet.</span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex gap-4" style={{ width: 'max-content' }}>
        {images.map((src, idx) => (
          <div key={idx} className="relative group shrink-0">
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-lg shadow-md border border-slate-200"
            />
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {idx + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
