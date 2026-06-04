import React from 'react';

interface LayoutCardProps {
  title: string;
  price: number;
  image?: string;
  description?: string;
  isSelected?: boolean;
  onToggle?: () => void;
}

export const LayoutCard: React.FC<LayoutCardProps> = ({
  title,
  price,
  image,
  description,
  isSelected = false,
  onToggle,
}) => {
  const formatPrice = (p: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(p);

  return (
    <div 
      className={`rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col gap-4 ${
        isSelected 
          ? 'border-[#f2a99a] bg-gradient-to-t from-[#fdf2f0] to-white' 
          : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-medium uppercase tracking-widest leading-tight">
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-[15px] font-medium text-gray-900">
            +{formatPrice(price)}
          </span>
          <div 
            className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
              isSelected 
                ? 'bg-[#111827] text-white' 
                : 'bg-white border border-gray-300 text-gray-400'
            }`}
          >
            {isSelected && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {description && (
        <p className="text-[12px] text-gray-500 leading-relaxed font-light">
          {description}
        </p>
      )}

      {image && (
        <div className="rounded-xl overflow-hidden aspect-video bg-gray-100">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};