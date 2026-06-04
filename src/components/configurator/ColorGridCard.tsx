import React from 'react';

interface ColorOption {
  id: string;
  label: string;
  color: string; // Hex or CSS gradient for dual-tone
  isDualTone?: boolean;
  bottomColor?: string;
}

interface ColorGridCardProps {
  title: string;
  price: number;
  options: ColorOption[];
  selectedOptionId?: string;
  isSelected: boolean;
  onToggle: () => void;
  onSelectOption: (optionId: string) => void;
}

export const ColorGridCard: React.FC<ColorGridCardProps> = ({
  title,
  price,
  options,
  selectedOptionId,
  isSelected,
  onToggle,
  onSelectOption,
}) => {
  return (
    <div 
      className={`
        relative w-full bg-white rounded-[16px] p-6 transition-all duration-300
        border-2 ${isSelected ? 'border-[#e05a41]' : 'border-transparent'}
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[16px]  text-[#111827] tracking-wider uppercase mb-1">
            {title}
          </h3>
          <p className="text-[16px] text-[#e05a41]">
            +${price.toLocaleString()}
          </p>
        </div>
        
        <button 
          onClick={onToggle}
          className={`
            w-[24px] h-[24px] rounded-[4px] border-2 flex items-center justify-center transition-all
            ${isSelected ? 'bg-[#e05a41] border-[#e05a41]' : 'border-gray-300 bg-white'}
          `}
        >
          {isSelected && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectOption(option.id)}
            className={`
              relative group rounded-[12px] overflow-hidden transition-all aspect-[2/1]
              ${selectedOptionId === option.id ? 'ring-2 ring-[#e05a41] ring-offset-2' : 'hover:scale-[1.02]'}
              shadow-sm border border-gray-100
            `}
          >
            {option.isDualTone ? (
              <div className="w-full h-full flex flex-col">
                {/* Top Label Area */}
                <div 
                  className="h-[35%] flex items-center justify-center px-2 bg-[#f4f4f2]"
                >
                  <span className="text-[9px] text-[#111827] uppercase tracking-tight text-center">
                    {option.label}
                  </span>
                </div>
                {/* Bottom Color Area */}
                <div 
                  className="h-[65%] w-full" 
                  style={{ backgroundColor: option.bottomColor }} 
                />
              </div>
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center px-4"
                style={{ backgroundColor: option.color }}
              >
                <span className={`
                  text-[10px]  uppercase tracking-tight text-center
                  ${['#e5e5e5', '#f5f5f0', '#ffffff'].includes(option.color.toLowerCase()) ? 'text-[#111827]' : 'text-white'}
                `}>
                  {option.label}
                </span>
              </div>
            )}

            {/* Selection Overlay */}
            {selectedOptionId === option.id && (
              <div className="absolute inset-0 bg-[#e05a41]/5 pointer-events-none" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
