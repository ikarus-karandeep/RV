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
import { SpecCard, ToggleGroup } from '../components/configurator/SpecCard';
import { LayoutCard } from '../components/configurator/LayoutCard';
import { TRAILER_TYPES, SIZE_OPTIONS, STEPS, EQUIPMENT_CATEGORIES } from '../utils/constants';

export const ConfiguratorPage: React.FC = () => {
  const { state, setStep, selectTrailerType, selectSize, nextStep } = useConfigurator();
  const [equipmentQuantities, setEquipmentQuantities] = useState<Record<string, number>>({});
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [vanModel, setVanModel] = useState('T5.1 (2010-15)');
  const [transmission, setTransmission] = useState('Manual');
  const [wheelbase, setWheelbase] = useState('Short Wheelbase');
  const [activeSubTab, setActiveSubTab] = useState('KITCHEN');
  
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const kitchenRef = React.useRef<HTMLDivElement>(null);
  const waterRef = React.useRef<HTMLDivElement>(null);
  const sleepingRef = React.useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    setActiveSubTab(section);
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      KITCHEN: kitchenRef,
      'WATER & SHOWER': waterRef,
      SLEEPING: sleepingRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
    <div className="relative h-screen bg-[#f0f0ee] flex flex-col overflow-hidden">
      <Header onBack={() => setStep(STEPS[0].id)} />

      {/* Main content area */}
      <main className="flex-1 min-h-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left preview section */}
          <PreviewSection />

          {/* Right panel */}
          <div className="flex flex-col flex-shrink-0 min-h-0 px-[20px] w-[26%]">
            {state.currentStepId === 'van-specs' && (
              <>
                <StepInfo
                  // title="Van Specifications"
                  // description="Customize the base vehicle specifications for your mobile business."
                />
                <div
                  className="
                    flex flex-col gap-[16px]
                    flex-1 min-h-0 overflow-y-auto
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
                    pb-20
                  "
                >
                  <SpecCard 
                    title="Base Van Model" 
                    footer={{ label: "Estimated Range", value: "110 MI" }}
                  >
                    <ToggleGroup 
                      options={['T5.1 (2010-15)', 'T6 (2015-18)', 'T6.1 (2018-)']} 
                      value={vanModel}
                      onChange={setVanModel}
                    />
                  </SpecCard>

                  <SpecCard 
                    title="Transmission" 
                    footer={{ label: "Traditional 6-speed gearbox", value: "" }}
                  >
                    <ToggleGroup 
                      options={['Manual', 'Automatic']} 
                      value={transmission}
                      onChange={setTransmission}
                    />
                  </SpecCard>

                  <SpecCard 
                    title="Wheelbase" 
                    footer={{ label: "Traditional 6-speed gearbox", value: "" }}
                  >
                    <ToggleGroup 
                      options={['Short Wheelbase', 'Long Wheelbase']} 
                      value={wheelbase}
                      onChange={setWheelbase}
                    />
                  </SpecCard>

                  <SpecCard 
                    title="Max Payload" 
                    footer={{ label: "Gross Vehicle Weight Rating (GVWR)", value: "9,050 LBS" }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[32px]  text-[#111827]">4,561 lbs</span>
                    </div>
                  </SpecCard>

                  <SpecCard 
                    title="Height" 
                    footer={{ label: "Provides 6 feet 7 inches (79.1 inches) of vertical clearance", value: "" }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[32px] text-[#111827]">8.5 ft</span>
                    </div>
                  </SpecCard>
                </div>
              </>
            )}

            {state.currentStepId === 'living-layout' && (
              <>
                <div className="flex justify-center gap-2 py-4 flex-shrink-0">
                  {['KITCHEN', 'WATER & SHOWER', 'SLEEPING'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => scrollToSection(tab)}
                      className={`
                        px-6 py-2 rounded-full text-[11px] font-bold tracking-widest transition-all
                        ${activeSubTab === tab 
                          ? 'bg-[#e05a41] text-white' 
                          : 'bg-white text-gray-500 hover:bg-gray-50'}
                      `}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div
                  ref={scrollContainerRef}
                  className="
                    flex flex-col gap-6
                    flex-1 min-h-0 overflow-y-auto
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
                    pb-32
                  "
                >
                  {/* Kitchen Section */}
                  <div ref={kitchenRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="MICROWAVE"
                      price={700}
                      image="/MicroWave.png"
                      quantity={1}
                      onIncrease={() => {}}
                      onDecrease={() => {}}
                    />
                  </div>

                  {/* Water & Shower Section */}
                  <div ref={waterRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="OGO ORIGIN COMPOST TOILET"
                      price={850}
                      image="https://www.figma.com/api/mcp/asset/bca76fbd-971b-4ba0-b4da-da2cff16eec0"
                      quantity={0}
                      onIncrease={() => {}}
                      onDecrease={() => {}}
                    />
                    <LayoutCard 
                      title="LAVEO DRYFLUSH ELECTRIC TOILET"
                      price={1100}
                      image="https://www.figma.com/api/mcp/asset/bca76fbd-971b-4ba0-b4da-da2cff16eec0"
                      quantity={0}
                      onIncrease={() => {}}
                      onDecrease={() => {}}
                    />
                  </div>

                  {/* Sleeping Section */}
                  <div ref={sleepingRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="ELECTRIC R&R BED UPGRADE"
                      price={2500}
                      image="https://www.figma.com/api/mcp/asset/43ea7fce-eefb-4748-b6fb-d91718a1bdbc"
                      quantity={1}
                      onIncrease={() => {}}
                      onDecrease={() => {}}
                    />
                    <LayoutCard 
                      title="REAR BENCH SEAT PET & STORAGE ANCHOR POINTS"
                      price={9300}
                      image="https://www.figma.com/api/mcp/asset/bca76fbd-971b-4ba0-b4da-da2cff16eec0"
                      quantity={0}
                      onIncrease={() => {}}
                      onDecrease={() => {}}
                    />
                  </div>
                </div>
              </>
            )}

            {state.currentStepId === 'size-specs' && (
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
                      <h3 className="text-[20px] ">Trailer Size</h3>
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
