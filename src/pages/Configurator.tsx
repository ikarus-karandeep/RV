import React, { useState } from 'react';
import { useConfigurator } from '../hooks/useConfigurator';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { PreviewSection } from '../components/configurator/PreviewSection';
import { StepInfo } from '../components/configurator/StepInfo';
import { TrailerTypeCard } from '../components/configurator/TrailerTypeCard';
import { SizeOptionCard } from '../components/configurator/SizeOptionCard';
import { EquipmentSection } from '../components/configurator/EquipmentSection';
import { BuildSummaryModal } from '../components/configurator/BuildSummaryModal';
import { TRAILER_TYPES, SIZE_OPTIONS, STEPS, EQUIPMENT_CATEGORIES } from '../utils/constants';

export const ConfiguratorPage: React.FC = () => {
  const { state, setStep, selectTrailerType, selectSize, nextStep } = useConfigurator();
  const [equipmentQuantities, setEquipmentQuantities] = useState<Record<string, number>>({});
  const [summaryOpen, setSummaryOpen] = useState(false);

  const isTrailerTypeStep = state.currentStepId === 'trailer-type';
  const isSizeSpecsStep = state.currentStepId === 'size-specs';
  const isEquipmentStep = state.currentStepId === 'equipment-side';
  const selectedTrailerType = TRAILER_TYPES.find(
    (type) => type.id === state.selectedTrailerTypeId,
  );
  const selectedSizeOption = SIZE_OPTIONS.find(
    (option) => option.id === state.selectedSizeId,
  );
  const selectedEquipmentItems = EQUIPMENT_CATEGORIES.flatMap((category) =>
    category.items
      .map((item) => ({
        ...item,
        quantity: equipmentQuantities[item.id] ?? 0,
      }))
      .filter((item) => item.quantity > 0),
  );

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setEquipmentQuantities((prev) => ({ ...prev, [itemId]: quantity }));
  };


  return (
    <div className="relative h-screen bg-[#f0f0ee] flex flex-col font-inter overflow-hidden">
      <Header onBack={() => setStep(STEPS[0].id)} />

      {/* Main content area */}
      <main className="flex-1 min-h-0 overflow-hidden">
        <div className="flex h-full pt-[8px] pl-[20px] pr-[20px] pb-[8px] gap-[40px]">
          {/* Left preview section */}
          <PreviewSection />

          {/* Right panel */}
          <div
  className="
    flex flex-col flex-shrink-0 min-h-0
    px-[20px]
    w-[clamp(380px,28vw,520px)]
    min-w-[380px]
    max-w-[520px]
  "
>
            {isTrailerTypeStep && (
              <>
                <StepInfo
                  title="Trailer Type"
                  description="Choose the trailer size to match your needs and equipments you need to keep."
                  tip="Start from the maximum size and reduce it later to perfectly fit your equipments"
                />
                <div
                  className="
                    flex flex-col gap-[12px]
                    flex-1 min-h-0 overflow-y-auto
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
                  "
                >
                  {TRAILER_TYPES.map((type) => (
                    <TrailerTypeCard
                      key={type.id}
                      type={type}
                      selected={state.selectedTrailerTypeId === type.id}
                      onSelect={selectTrailerType}
                      onContinue={nextStep}
                    />
                  ))}
                </div>
              </>
            )}

            {isSizeSpecsStep && (
              <>
                <StepInfo
                  title="Trailer Size & Specifications"
                  description="Choose the trailer size to match your needs and equipments you need to keep."
                  tip="Start from the maximum size and reduce it later to perfectly fit your equipments"
                />
                <div
                  className="
                    flex-1 min-h-0 overflow-y-auto
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
                  "
                >
                  <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[32px] flex flex-col gap-[16px] shadow-sm">
                    <div className="border-l-4 border-black pl-[12px] mb-[8px]">
                      <h3 className="text-[20px] font-bold">Trailer Size</h3>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                      {SIZE_OPTIONS.map((option) => (
                        <SizeOptionCard
                          key={option.id}
                          option={option}
                          selected={state.selectedSizeId === option.id}
                          onSelect={selectSize}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {isEquipmentStep && (
              <>
                <StepInfo
                  title="Equipment"
                  description="Choose equipment that match your business needs"
                />
                <div
                  className="
                    flex flex-col gap-[16px]
                    flex-1 min-h-0 overflow-y-auto
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
                  "
                >
                  {EQUIPMENT_CATEGORIES.map((category) => (
                    <EquipmentSection
                      key={category.id}
                      category={category}
                      quantities={equipmentQuantities}
                      onQuantityChange={handleQuantityChange}
                      selectedTrailerTypeId={state.selectedTrailerTypeId ?? ''}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Bottom nav */}
      <BottomNav
        currentStepId={state.currentStepId}
        onStepChange={setStep}
        onBuildSummary={() => setSummaryOpen(true)}
      />

      <BuildSummaryModal
        open={summaryOpen}
        trailerType={selectedTrailerType}
        sizeOption={selectedSizeOption}
        equipmentItems={selectedEquipmentItems}
        onClose={() => setSummaryOpen(false)}
      />
    </div>
  );
};
