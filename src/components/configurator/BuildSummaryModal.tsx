import React from 'react';
import type { SizeOption, TrailerType } from '../../types';
import type { EquipmentItem } from '../../utils/constants';

interface SelectedEquipmentItem extends EquipmentItem {
  quantity: number;
  category: string;
}

interface BuildSummaryModalProps {
  open: boolean;
  trailerType?: TrailerType;
  sizeOption?: SizeOption;
  equipmentItems: SelectedEquipmentItem[];
  vanSpecs: {
    model: string;
    transmission: string;
    wheelbase: string;
  };
  onClose: () => void;
}

const formatPrice = (price: number) => `$${price.toLocaleString()}`;

export const BuildSummaryModal: React.FC<BuildSummaryModalProps> = ({
  open,
  trailerType,
  sizeOption,
  equipmentItems,
  vanSpecs,
  onClose,
}) => {
  const [activeTab, setActiveTab] = React.useState<'PACKAGE' | 'CONFIGURATIONS'>('CONFIGURATIONS');

  if (!open) {
    return null;
  }

  const equipmentTotal = (equipmentItems || []).reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0,
  );
  const subtotal =
    (trailerType?.basePrice || 0) + (sizeOption?.price || 0) + equipmentTotal;

  // Group items by category
  const itemsByCategory = (equipmentItems || []).reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, SelectedEquipmentItem[]>);

  const getCategoryTotal = (categoryItems: SelectedEquipmentItem[]) => {
    return (categoryItems || []).reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/20">
      {/* Backdrop overlay for closing */}
      <div 
        className="absolute inset-0 cursor-default" 
        onClick={onClose}
      />

      <section className="relative w-[30%] h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-8">
          <h2 className="text-[32px] font-bold text-[#111827]">Your Build</h2>
          <button
            type="button"
            onClick={onClose}
            className="size-[48px] flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 space-y-6">
          {/* Main Product Card */}
          <div className="bg-gray-50 rounded-3xl p-6 flex items-center gap-6">
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex-shrink-0">
              <img
                src={"/assets/CamperVan/image 64.png" || "https://www.figma.com/api/mcp/asset/8febc3e6-2d17-4a52-a1c7-2d9675eb7406"}
                alt="Product"
                className="w-24 h-auto object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-gray-400 uppercase tracking-wider truncate">
                {trailerType?.title || 'SELECT A VAN'}
              </p>
              <p className="text-[24px] font-bold text-[#111827]">
                {formatPrice(trailerType?.basePrice || 0)}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 pb-0">
            <button 
              onClick={() => setActiveTab('PACKAGE')}
              className={`flex-1 text-[12px] font-bold py-4 border-b-2 transition-all ${
                activeTab === 'PACKAGE' ? 'text-[#111827] border-[#111827]' : 'text-gray-400 border-transparent'
              }`}
            >
              1. PACKAGE
            </button>
            <button 
              onClick={() => setActiveTab('CONFIGURATIONS')}
              className={`flex-1 text-[12px] font-bold py-4 border-b-2 transition-all ${
                activeTab === 'CONFIGURATIONS' ? 'text-[#111827] border-[#111827]' : 'text-gray-400 border-transparent'
              }`}
            >
              2. CONFIGURATIONS
            </button>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-4">
            {activeTab === 'PACKAGE' ? (
              <div className="space-y-6 pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-bold text-[#111827]">VAN SPECIFICATIONS</span>
                    <span className="text-[15px] font-bold text-[#111827]">{formatPrice(trailerType?.basePrice || 0)}</span>
                  </div>
                  <div className="space-y-3 text-[14px]">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Base Van Model</span>
                      <span className="text-gray-900 font-medium">{vanSpecs.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Transmission</span>
                      <span className="text-gray-900 font-medium">{vanSpecs.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Wheelbase</span>
                      <span className="text-gray-900 font-medium">{vanSpecs.wheelbase}</span>
                    </div>
                  </div>
                </div>

                {trailerType?.features && trailerType.features.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-gray-50">
                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Features Included</p>
                    <div className="grid grid-cols-1 gap-2">
                      {trailerType.features.map(f => (
                        <div key={f.id} className="flex items-center gap-2 text-[14px] text-gray-600">
                          <div className="size-1.5 rounded-full bg-gray-300" />
                          {f.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Living Layout Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-[#111827]">LIVING LAYOUT</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    </div>
                    <span className="text-[15px] font-bold text-[#111827]">
                       {sizeOption ? `+${formatPrice(sizeOption.price + getCategoryTotal(itemsByCategory['LIVING LAYOUT'] || []))}` : formatPrice(getCategoryTotal(itemsByCategory['LIVING LAYOUT'] || []))}
                    </span>
                  </div>
                  
                  <div className="pl-0 space-y-3 text-[14px]">
                    {sizeOption && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Selected Size</span>
                        <span className="text-gray-900 font-medium">{sizeOption?.size}</span>
                      </div>
                    )}
                    {(itemsByCategory['LIVING LAYOUT'] || []).map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-gray-500">{item.name} (x{item.quantity})</span>
                        <span className="text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Sections */}
                {['BASE VAN SYSTEMS', 'ADVENTURE & UTILITY', 'COMFORT & TECHNOLOGY', 'EXTERIOR & SAFETY'].map((section) => {
                  const items = itemsByCategory[section] || [];
                  const total = getCategoryTotal(items);
                  const hasItems = items.length > 0;
                  
                  return (
                    <div key={section} className="space-y-4 pt-4 border-t border-gray-50">
                      <div className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className={`text-[15px] font-bold text-[#111827] ${!hasItems && 'opacity-60'}`}>{section}</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-400 ${!hasItems && 'opacity-60'}`}>
                            <polyline points={hasItems ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                          </svg>
                        </div>
                        <span className={`text-[15px] font-bold text-[#111827] ${!hasItems && 'opacity-60'}`}>{formatPrice(total)}</span>
                      </div>
                      
                      {hasItems && (
                        <div className="pl-0 space-y-3 text-[14px]">
                          {items.map(item => (
                            <div key={item.id} className="flex justify-between">
                              <span className="text-gray-500">{item.name} (x{item.quantity})</span>
                              <span className="text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Build Summary Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-8 pb-4 space-y-6 !mt-8">
            <h3 className="text-[24px] font-bold text-[#111827]">Build Summary</h3>
            <div className="h-px bg-gray-100" />
            
            <div className="space-y-4">
              <label className="text-[14px] font-medium text-gray-400">Special Instructions</label>
              <div className="bg-gray-50 rounded-2xl p-6 text-[15px] text-gray-500 leading-relaxed">
                I need it for a family trip during spring break
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex justify-between items-center text-[18px]">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900 font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-[18px]">
                <span className="text-gray-500">Other Charges</span>
                <span className="text-gray-400">-</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[32px] font-bold text-[#111827]">Total</span>
                <span className="text-[32px] font-bold text-[#111827]">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <button className="w-full bg-[#111827] text-white py-6 rounded-2xl text-[16px] font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-xl shadow-gray-200 mb-8">
              Connect With Dealer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
