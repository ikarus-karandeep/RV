import React from 'react';
import type { SizeOption } from '../../types';

interface SizeOptionCardProps {
  option: SizeOption;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const SizeOptionCard: React.FC<SizeOptionCardProps> = ({ option, selected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(option.id)}
      className={`
        p-[7px] rounded-[8px] border transition-all cursor-pointer w-full
        ${selected 
          ? 'bg-[rgba(239,244,255,0.3)] border-[#111827] border-2' 
          : 'bg-white border-[#e2e8f0] hover:border-gray-300'}
      `}
    >
      <div className="flex items-center justify-between mb-[16px]">
        <div className="flex items-center gap-[16px]">
          {/* Radio Indicator */}
          <div className={`
            size-[24px] rounded-full border-2 flex items-center justify-center shrink-0
            ${selected ? 'border-[#111827]' : 'border-[#c6c6cd]'}
          `}>
            {selected && <div className="size-[12px] rounded-full bg-[#111827]" />}
          </div>

          {/* Image */}
          {/* <div className="w-[104px] h-[52px] bg-gray-50 rounded flex items-center justify-center overflow-hidden">
            <img src={option.image} alt={option.size} className="w-full h-full object-contain" />
          </div> */}

          {/* Size Info */}
          <div className="flex flex-col">
            <h3 className="text-[15px] font-semibold text-[#0b1c30]">
              {option.size}
            </h3>
            {!selected && (
              <p className="text-[12px] text-[#45464d] leading-[20px]">
                {option.description}
              </p>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-[18px] font-semibold text-[#0b1c30]">
          ${option.price.toLocaleString()}
        </div>
      </div>

      {/* Expanded Features (Selected State Only) */}
      {selected && (
        <div className="flex flex-col gap-[24px] mt-[24px]">
          <p className="text-[14px] font-medium text-[#6b7280] leading-[24px]">
            {option.description}
          </p>
          <div className="bg-[#f8f9ff] rounded-[12px] p-[16px] grid grid-cols-2 gap-x-[16px] gap-y-[24px]">
            {option.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-[12px]">
                <div className="size-[16px] bg-blue-100 rounded-full flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#0053D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[14px] text-[#0b1c30] whitespace-normal">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
