import React from 'react';
import type { TrailerType } from '../../types';
import { Card } from '../common/Card';

interface TrailerTypeCardProps {
  type: TrailerType;
  selected: boolean;
  onSelect: (id: string) => void;
  onContinue?: () => void;
}

export const TrailerTypeCard: React.FC<TrailerTypeCardProps> = ({
  type,
  selected,
  onSelect,
  onContinue,
}) => {
  return (
    <Card
      onClick={() => onSelect(type.id)}
      selected={selected}
      className="flex flex-col w-full shrink-0"
    >
      {/* Top row */}
      <div className="flex justify-between items-center px-[20px] pt-[18px] pb-[14px]">
        <div className="bg-[#f0f0ee] rounded-full px-[14px] py-[6px]">
          <span className="text-[#1f2937] text-[13px] font-semibold">
            Base Price : ${type.basePrice.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          className="text-[#9ca3af] text-[13px] underline"
          onClick={(e) => e.stopPropagation()}
        >
          more info
        </button>
      </div>

      {/* Image */}
      <div className="w-full h-[180px] bg-[#f0f4ff] overflow-hidden flex-shrink-0 flex items-center justify-center">
        <img
          src={type.image}
          alt={type.title}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-[6px] px-[20px] pt-[16px] pb-[14px]">
        <h3 className="text-[22px] font-bold tracking-[-0.4px] text-[#111827]">
          {type.title}
        </h3>
        <p className="text-[#6b7280] text-[14px] leading-[1.5]">
          {type.description}
        </p>
      </div>

      {/* Features */}
      <div className="px-[20px] pb-[20px] flex flex-col gap-[8px]">
        <h4 className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-[0.6px]">
          {type.title.split(' ')[0]} Specific Features:
        </h4>

        <div className="grid grid-cols-2 gap-x-[12px] gap-y-[6px]">
          {type.features.map((feature) => (
            <div key={feature.id} className="flex items-center gap-[8px]">
              <div className="size-[20px] bg-[#f0f0ee] rounded-[5px] flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="4" stroke="#888" strokeWidth="1.2" />
                </svg>
              </div>
              <span className="text-[#1f2937] text-[12px] font-medium whitespace-nowrap">
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Continue button — slides up from below on selection */}
      <div
        style={{
          maxHeight: selected ? '120px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          style={{
            transform: selected ? 'translateY(0)' : 'translateY(40px)',
            opacity: selected ? 1 : 0,
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
          }}
          className="px-[20px] pt-[18px] pb-[20px]"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onContinue?.();
            }}
            className="
              w-full bg-[#111827] text-white rounded-[10px] h-[52px]
              text-[15px] font-medium tracking-[0.3px]
              flex items-center justify-center gap-[8px]
            "
          >
            Continue
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
};
