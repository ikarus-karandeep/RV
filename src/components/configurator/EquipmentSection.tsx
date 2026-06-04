import React from 'react';
import type { EquipmentCategory } from '../../utils/constants';

interface EquipmentSectionProps {
  category: EquipmentCategory;
  quantities: Record<string, number>;
  onQuantityChange: (itemId: string, quantity: number) => void;
  selectedTrailerTypeId: string;
}

const TRAILER_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  'store-dispense': { label: 'STORE', color: 'bg-blue-100 text-blue-700' },
  'cook-serve': { label: 'COOK', color: 'bg-orange-100 text-orange-600' },
};

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({
  category,
  quantities,
  onQuantityChange,
}) => {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[24px] flex flex-col gap-[20px] shadow-sm">
      {/* Category header */}
      <div className="flex items-center justify-between">
        <div className="border-l-4 border-black pl-[12px]">
          <h3 className="text-[20px] font-bold text-[#111827]">{category.name}</h3>
        </div>
        <div className="flex gap-[6px]">
          {category.trailerTypes.map((t) => {
            const tag = TRAILER_TYPE_LABELS[t];
            return tag ? (
              <span
                key={t}
                className={`text-[11px] font-bold px-[12px] py-[6px] rounded-full ${tag.color}`}
              >
                {tag.label}
              </span>
            ) : null;
          })}
        </div>
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-2 gap-[12px]">
        {category.items.map((item) => {
          const qty = quantities[item.id] ?? 0;
          return (
            <div
              key={item.id}
              className="bg-white border border-[#e5e7eb] rounded-[12px] p-[16px] flex flex-col items-center gap-[12px] 
              transition-all duration-300 cursor-pointer group
              hover:bg-gradient-to-t hover:from-[#e8f0ff] hover:to-white hover:border-[#bfdbfe] hover:shadow-lg"
            >
              {/* More info */}
              <button className="self-end text-[11px] text-[#9ca3af] underline hover:text-[#3b82f6] transition-colors">
                more info
              </button>

              {/* Image */}
              <div className="w-full h-[140px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full object-contain"
                />
              </div>

              {/* Name */}
              <p className="text-[15px] font-bold text-[#111827] text-center">
                {item.name}
              </p>

              {/* Price */}
              <p className="text-[18px] font-bold text-[#111827]">
                ${item.price.toLocaleString()}
              </p>

              {/* Quantity control */}
              <div className="flex items-center bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden w-full mt-auto shadow-sm">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuantityChange(item.id, Math.max(0, qty - 1));
                  }}
                  className="flex-1 py-[12px] text-[20px] font-medium text-[#374151] hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <div className="w-[1px] h-[40px] bg-[#e5e7eb]" />
                <span className="flex-1 text-center text-[15px] font-bold text-[#111827] py-[12px]">
                  {qty}
                </span>
                <div className="wpx] h-[40px] bg-[#e5e7eb]" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuantityChange(item.id, qty + 1);
                  }}
                  className="flex-1 py-[12px] text-[20px] font-medium text-[#374151] hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};