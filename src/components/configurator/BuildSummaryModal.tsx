import React, { useState } from 'react';
import type { SizeOption, TrailerType } from '../../types';
import type { EquipmentItem } from '../../utils/constants';

interface SelectedEquipmentItem extends EquipmentItem {
  quantity: number;
}

interface BuildSummaryModalProps {
  open: boolean;
  trailerType?: TrailerType;
  sizeOption?: SizeOption;
  equipmentItems: SelectedEquipmentItem[];
  onClose: () => void;
}

type SummaryTab = 'type' | 'size' | 'equipments' | 'additional';

const SUMMARY_TABS: Array<{ id: SummaryTab; label: string }> = [
  { id: 'type', label: 'TYPE' },
  { id: 'size', label: 'SIZE' },
  { id: 'equipments', label: 'EQUIPMENTS' },
  { id: 'additional', label: 'ADDITIONAL' },
];

const formatPrice = (price: number) => `$${price.toLocaleString()}`;

export const BuildSummaryModal: React.FC<BuildSummaryModalProps> = ({
  open,
  trailerType,
  sizeOption,
  equipmentItems,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<SummaryTab>('type');

  if (!open) {
    return null;
  }

  const equipmentTotal = equipmentItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const subtotal =
    (trailerType?.basePrice ?? 0) + (sizeOption?.price ?? 0) + equipmentTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 px-[16px] pt-[24px]">
      <button
        type="button"
        aria-label="Close build summary"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <section className="relative w-full max-w-[1180px] max-h-[92vh] overflow-hidden rounded-t-[16px] bg-[#f5f5f3] shadow-2xl animate-[summarySlideUp_260ms_ease-out]">
        <div className="flex items-center justify-between border-b border-[#e5e7eb] bg-white px-[24px] py-[14px]">
          <h2 className="text-[24px] font-bold text-[#111827]">Build Summary</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="size-[42px] rounded-[8px] border border-[#e5e7eb] bg-white text-[24px] leading-none text-[#111827] hover:bg-gray-50"
          >
            ×
          </button>
        </div>

        <div className="max-h-[calc(92vh-71px)] overflow-y-auto p-[24px]">
          <div className="rounded-[12px] bg-white p-[18px]">
            <div className="flex items-center gap-[28px] rounded-[10px] bg-[#f5f5f3] px-[28px] py-[16px]">
              {trailerType && (
                <img
                  src={trailerType.image}
                  alt={trailerType.title}
                  className="h-[86px] w-[150px] object-contain"
                />
              )}
              <div>
                <p className="text-[24px] font-medium uppercase tracking-[0.02em] text-[#5b616b]">
                  Concession Trailer
                </p>
                <p className="text-[32px] font-bold text-[#111827]">
                  {formatPrice(subtotal)}
                </p>
              </div>
            </div>

            <div className="mt-[32px] grid grid-cols-4 gap-[16px]">
              {SUMMARY_TABS.map((tab, index) => {
                const selected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      h-[52px] border-b-[3px] text-[15px] font-medium uppercase tracking-[0.02em] transition-colors
                      ${
                        selected
                          ? 'border-[#111827] text-[#111827]'
                          : 'border-transparent text-[#4b5563] hover:text-[#111827]'
                      }
                    `}
                  >
                    {index + 1}. {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-[28px] rounded-[12px] border border-[#e5e7eb] bg-white p-[24px]">
              {activeTab === 'type' && (
                trailerType ? (
                  <div className="flex items-center gap-[28px]">
                    <img
                      src={trailerType.image}
                      alt={trailerType.title}
                      className="h-[120px] w-[180px] rounded-[8px] bg-[#f0f4ff] object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[24px] font-bold text-[#111827]">
                        {trailerType.title}
                      </p>
                      <p className="mt-[8px] text-[16px] leading-[1.5] text-[#6b7280]">
                        {trailerType.description}
                      </p>
                      <p className="mt-[14px] text-[20px] font-semibold text-[#111827]">
                        {formatPrice(trailerType.basePrice)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[16px] text-[#6b7280]">No trailer type selected</p>
                )
              )}

              {activeTab === 'size' && (
                sizeOption ? (
                  <div className="flex items-center justify-between gap-[24px]">
                    <div>
                      <p className="text-[24px] font-bold text-[#111827]">
                        {sizeOption.size}
                      </p>
                      <p className="mt-[8px] text-[16px] leading-[1.5] text-[#6b7280]">
                        {sizeOption.description}
                      </p>
                    </div>
                    <p className="text-[22px] font-bold text-[#111827]">
                      {formatPrice(sizeOption.price)}
                    </p>
                  </div>
                ) : (
                  <p className="text-[16px] text-[#6b7280]">No size selected</p>
                )
              )}

              {activeTab === 'equipments' && (
                equipmentItems.length > 0 ? (
                  <div className="flex flex-col gap-[18px]">
                    {equipmentItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex min-h-[112px] items-center gap-[24px] rounded-[12px] border border-[#e5e7eb] px-[28px] py-[18px]"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-[80px] w-[110px] object-contain"
                        />
                        <p className="min-w-0 flex-1 text-[22px] font-medium uppercase text-[#111827]">
                          {item.name}
                        </p>
                        <span className="rounded-full border border-[#111827] px-[22px] py-[10px] text-[14px] font-medium uppercase">
                          Qty {item.quantity}
                        </span>
                        <span className="rounded-full bg-[#fde4dd] px-[28px] py-[11px] text-[14px] font-medium uppercase text-[#111827]">
                          {item.trailerTypes.includes('cook-serve') ? 'Cook' : 'Store'}
                        </span>
                        <p className="w-[150px] text-right text-[22px] font-medium text-[#111827]">
                          +{formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[16px] text-[#6b7280]">No equipment selected</p>
                )
              )}

              {activeTab === 'additional' && (
                <p className="text-[16px] text-[#6b7280]">
                  No additional selections yet
                </p>
              )}
            </div>
          </div>

          <div className="mt-[18px] rounded-[12px] bg-white px-[28px] py-[22px]">
            <div className="flex items-center justify-between text-[18px] text-[#4b5563]">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-[12px] flex items-center justify-between text-[28px] font-bold text-[#111827]">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
