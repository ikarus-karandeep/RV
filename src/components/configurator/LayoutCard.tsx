import React from 'react';

interface LayoutCardProps {
  title: string;
  price: number;
  image: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const LayoutCard: React.FC<LayoutCardProps> = ({
  title,
  price,
  image,
  quantity,
  onIncrease,
  onDecrease,
}) => {
  const formatPrice = (p: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(p);

  return (
    <div className="bg-white roundex-[12px] p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-semiBold text-gray-700 uppercase tracking-widest">{title}</h3>
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold text-gray-900">+{formatPrice(price)}</span>
          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
            <button 
              onClick={onDecrease}
              className={`size-8 flex items-center justify-center rounded-md hover:bg-white transition-colors ${quantity === 0 ? 'text-gray-300' : 'text-gray-900 shadow-sm'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="12" x2="6" y2="12" />
              </svg>
            </button>
            <span className="w-8 text-center text-[14px] font-bold">{quantity}</span>
            <button 
              onClick={onIncrease}
              className="size-8 flex items-center justify-center rounded-md bg-white text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
