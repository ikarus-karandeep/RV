import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '../hooks/useConfigurator';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { PreviewSection } from '../components/configurator/PreviewSection';
import { StepInfo } from '../components/configurator/StepInfo';
import { SizeOptionCard } from '../components/configurator/SizeOptionCard';
import { EquipmentSection } from '../components/configurator/EquipmentSection';
import { BuildSummaryModal } from '../components/configurator/BuildSummaryModal';
import { SpecCard, ToggleGroup } from '../components/configurator/SpecCard';
import { LayoutCard } from '../components/configurator/LayoutCard';
import { 
  TRAILER_TYPES, 
  SIZE_OPTIONS, 
  EQUIPMENT_CATEGORIES,
  LAYOUT_TECH_ITEMS,
  BUMPER_COLORS,
  DUAL_TONE_COLORS,
} from '../utils/constants';
import { ColorGridCard } from '../components/configurator/ColorGridCard';


export const ConfiguratorPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setStep, selectSize } = useConfigurator();
  const [equipmentQuantities, setEquipmentQuantities] = useState<Record<string, number>>({});
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [vanModel, setVanModel] = useState('T5.1 (2010-15)');
  const [transmission, setTransmission] = useState('Manual');
  const [wheelbase, setWheelbase] = useState('Short Wheelbase');
  const [activeSubTab, setActiveSubTab] = useState('KITCHEN');
  const [selectedBumperColor, setSelectedBumperColor] = useState(BUMPER_COLORS[0].id);
  const [selectedDualToneColor, setSelectedDualToneColor] = useState(DUAL_TONE_COLORS[0].id);

  React.useEffect(() => {
    if (state.currentStepId === 'living-layout') {
      setActiveSubTab('KITCHEN');
    } else if (state.currentStepId === 'comfort-technology') {
      setActiveSubTab('CLIMATE CONTROL');
    } else if (state.currentStepId === 'adventure-utility') {
      setActiveSubTab('ROOF & EXTERIOR');
    // } else if (state.currentStepId === 'exterior-safety') {
    //   setActiveSubTab('PAINT & FINISH');
    }
  }, [state.currentStepId]);
  
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const kitchenRef = React.useRef<HTMLDivElement>(null);
  const waterRef = React.useRef<HTMLDivElement>(null);
  const sleepingRef = React.useRef<HTMLDivElement>(null);
  const climateRef = React.useRef<HTMLDivElement>(null);
  const smartRef = React.useRef<HTMLDivElement>(null);
  const interiorRef = React.useRef<HTMLDivElement>(null);
  const roofRef = React.useRef<HTMLDivElement>(null);
  const lightingRef = React.useRef<HTMLDivElement>(null);
  const towingRef = React.useRef<HTMLDivElement>(null);
  const paintRef = React.useRef<HTMLDivElement>(null);
  const safetyRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      let sections: { label: string; ref: React.RefObject<HTMLDivElement | null> }[] = [];
      if (state.currentStepId === 'living-layout') {
        sections = [
          { label: 'KITCHEN', ref: kitchenRef },
          { label: 'WATER & SHOWER', ref: waterRef },
          { label: 'SLEEPING', ref: sleepingRef },
        ];
      } else if (state.currentStepId === 'comfort-technology') {
        sections = [
          { label: 'CLIMATE CONTROL', ref: climateRef },
          { label: 'SMART SYSTEMS', ref: smartRef },
          { label: 'INTERIOR COMFORT', ref: interiorRef },
        ];
      } else if (state.currentStepId === 'adventure-utility') {
        sections = [
          { label: 'ROOF & EXTERIOR', ref: roofRef },
          { label: 'TOWING', ref: towingRef },
          { label: 'LIGHTING', ref: lightingRef },
        ];
      }

      if (sections.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      let activeSection = '';

      // Find the last section that has scrolled past the top threshold
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top - containerRect.top <= 80) {
            activeSection = section.label;
          }
        }
      }

      if (activeSection) {
        setActiveSubTab(activeSection);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [state.currentStepId]);

  const scrollToSection = (section: string) => {
    setActiveSubTab(section);
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      KITCHEN: kitchenRef,
      'WATER & SHOWER': waterRef,
      SLEEPING: sleepingRef,
      'CLIMATE CONTROL': climateRef,
      'SMART SYSTEMS': smartRef,
      'INTERIOR COMFORT': interiorRef,
      'ROOF & EXTERIOR': roofRef,
      LIGHTING: lightingRef,
      TOWING: towingRef,
      // 'PAINT & FINISH': paintRef,
      SAFETY: safetyRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isEquipmentStep = state.currentStepId === 'equipment-side';
  const isTechStep = state.currentStepId === 'comfort-technology';
  const isAdventureStep = state.currentStepId === 'adventure-utility';
  const isExteriorStep = state.currentStepId === 'exterior-safety';
  const selectedTrailerType = TRAILER_TYPES.find(
    (type) => type.id === state.selectedTrailerTypeId,
  );
  const selectedSizeOption = SIZE_OPTIONS.find(
    (option) => option.id === state.selectedSizeId,
  );
  const selectedEquipmentItems = [
    ...EQUIPMENT_CATEGORIES.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        category: category.name,
        quantity: equipmentQuantities[item.id] ?? 0,
      }))
    ),
    ...LAYOUT_TECH_ITEMS.map((item) => {
      let name = item.name;
      if (item.id === 'bumper-colour-coding') {
        const color = BUMPER_COLORS.find(c => c.id === selectedBumperColor);
        if (color) name = `${item.name} (${color.label})`;
      } else if (item.id === 'dual-tone') {
        const color = DUAL_TONE_COLORS.find(c => c.id === selectedDualToneColor);
        if (color) name = `${item.name} (${color.label})`;
      }
      
      return {
        ...item,
        name,
        image: '',
        trailerTypes: [],
        quantity: equipmentQuantities[item.id] ?? 0,
      };
    }),
  ].filter((item) => item.quantity > 0);

  const equipmentTotal = selectedEquipmentItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0,
  );
  const totalPrice =
    120 + (selectedSizeOption?.price || 0) + equipmentTotal;

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setEquipmentQuantities((prev) => ({ ...prev, [itemId]: quantity }));
  };


  return (
    <div className="relative h-screen bg-[#f0f0ee] flex flex-col overflow-hidden">
      <Header onBack={() => navigate('/begin')} />

      {/* Main content area */}
      <main className="flex-1 min-h-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left preview section */}
          <PreviewSection />

          {/* Right panel */}
          <div className="flex flex-col flex-shrink-0 min-h-0 pt-[22px] px-[20px] w-[26%]">
            {state.currentStepId === 'van-specs' && (
              <>
                {/* <StepInfo
                  // title="Van Specifications"
                  // description="Customize the base vehicle specifications for your mobile business."
                /> */}
                <div
                  className="
                    flex flex-col gap-[16px]
                    flex-1 min-h-0 overflow-y-auto
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
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
                  <SpecCard 
                    title="Length" 
                    footer={{ label: "Interior Cargo Bed Length", value: "15.7FT" }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[32px] text-[#111827]">24 ft</span>
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
                  "
                >
                  {/* Kitchen Section */}
                  <div ref={kitchenRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="MICROWAVE"
                      price={700}
                      image="/MicroWave.png"
                      isSelected={(equipmentQuantities['microwave'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['microwave'] ?? 0;
                        handleQuantityChange('microwave', current > 0 ? 0 : 1);
                      }}
                    />
                  </div>

                  {/* Water & Shower Section */}
                  <div ref={waterRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="Hot Water System"
                      price={850}
                      image="/HotWater.png"
                      isSelected={(equipmentQuantities['Hot Water System'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['Hot Water System'] ?? 0;
                        handleQuantityChange('Hot Water System', current > 0 ? 0 : 1);
                      }}
                    />
                    <LayoutCard 
                      title="Underslung Water Tank"
                      price={1100}
                      image="/Underslung.png"
                      isSelected={(equipmentQuantities['Underslung Water Tank'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['Underslung Water Tank'] ?? 0;
                        handleQuantityChange('Underslung Water Tank', current > 0 ? 0 : 1);
                      }}
                    />
                    <LayoutCard 
                      title="Rear Shower Point"
                      price={1100}
                      image="/Rear_Shower.png"
                      isSelected={(equipmentQuantities['Rear Shower Point'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['Rear Shower Point'] ?? 0;
                        handleQuantityChange('Rear Shower Point', current > 0 ? 0 : 1);
                      }}
                    />
                  </div>

                  {/* Sleeping Section */}
                  <div ref={sleepingRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="ELECTRIC R&R BED UPGRADE"
                      price={2500}
                      image="/ElectricBed.png"
                      isSelected={(equipmentQuantities['electric-bed-upgrade'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['electric-bed-upgrade'] ?? 0;
                        handleQuantityChange('electric-bed-upgrade', current > 0 ? 0 : 1);
                      }}
                    />
                    <LayoutCard 
                      title="REAR BENCH SEAT PET & STORAGE ANCHOR POINTS"
                      price={9300}
                      image="/RearBench.png"
                      isSelected={(equipmentQuantities['rear-bench-anchor-points'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['rear-bench-anchor-points'] ?? 0;
                        handleQuantityChange('rear-bench-anchor-points', current > 0 ? 0 : 1);
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {state.currentStepId === 'size-specs' && (
              <>
                <StepInfo
                  // title="Trailer Size & Specifications"
                  // description="Choose the trailer size to match your needs and equipments you need to keep."
                  // tip="Start from the maximum size and reduce it later to perfectly fit your equipments"
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
                  // title="Equipment"
                  // description="Choose equipment that match your business needs"
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

            {isTechStep && (
              <>
                <div className="flex justify-center gap-2 py-4 flex-shrink-0">
                  {['CLIMATE CONTROL', 'SMART SYSTEMS', 'INTERIOR COMFORT'].map((tab) => (
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
                    pb-10
                  "
                >
                  {/* Climate Control Section */}
                  <div ref={climateRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="DIESEL NIGHT HEATER"
                      price={700}
                      description="Maximize Your Van's Rooftop Storage. This Rugged, No-Drill Aluminum Combo Safely Secures Heavy Gear And Provides Easy, Slip-Resistant Access."
                      isSelected={(equipmentQuantities['diesel-night-heater'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['diesel-night-heater'] ?? 0;
                        handleQuantityChange('diesel-night-heater', current > 0 ? 0 : 1);
                      }}
                    />
                    <LayoutCard 
                      title="THERMOSTAT COMFORT CONTROLLER UPGRADE"
                      price={700}
                      description="Maximize Your Van's Rooftop Storage. This Rugged, No-Drill Aluminum Combo Safely Secures Heavy Gear And Provides Easy, Slip-Resistant Access."
                      isSelected={(equipmentQuantities['thermostat-upgrade'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['thermostat-upgrade'] ?? 0;
                        handleQuantityChange('thermostat-upgrade', current > 0 ? 0 : 1);
                      }}
                    />
                  </div>

                  {/* Smart Systems Section */}
                  <div ref={smartRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="DIGITAL DISPLAY CONTROLLER SCREEN"
                      price={250}
                      description="Maximize Your Van's Rooftop Storage. This Rugged, No-Drill Aluminum Combo Safely Secures Heavy Gear And Provides Easy, Slip-Resistant Access."
                      image="/DigitalDisplay.png"
                      isSelected={(equipmentQuantities['digital-display'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['digital-display'] ?? 0;
                        handleQuantityChange('digital-display', current > 0 ? 0 : 1);
                      }}
                    />
                    <LayoutCard 
                      title="CAMPERVAN WIFI"
                      price={700}
                      description="Maximize Your Van's Rooftop Storage. This Rugged, No-Drill Aluminum Combo Safely Secures Heavy Gear And Provides Easy, Slip-Resistant Access."
                      isSelected={(equipmentQuantities['campervan-wifi'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['campervan-wifi'] ?? 0;
                        handleQuantityChange('campervan-wifi', current > 0 ? 0 : 1);
                      }}
                    />
                  </div>

                  {/* Interior Comfort Section */}
                  <div ref={interiorRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="UPHOLSTERY UPGRADE TO LEATHERETTE"
                      price={250}
                      description="Maximize Your Van's Rooftop Storage. This Rugged, No-Drill Aluminum Combo Safely Secures Heavy Gear And Provides Easy, Slip-Resistant Access."
                      image="/Upholstery.png"
                      isSelected={(equipmentQuantities['upholstery-upgrade'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['upholstery-upgrade'] ?? 0;
                        handleQuantityChange('upholstery-upgrade', current > 0 ? 0 : 1);
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {isAdventureStep && (
              <>
                <div className="flex justify-center gap-2 py-4 flex-shrink-0">
                  {['ROOF & EXTERIOR', 'TOWING', 'LIGHTING'].map((tab) => (
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
                    pb-10
                  "
                >
                  {/* Roof & Exterior Section */}
                  <div ref={roofRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="REIMO AWNING RAIL"
                      price={2600}
                      image="/Reimo.png"
                      isSelected={(equipmentQuantities['reimo-awning-rail'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['reimo-awning-rail'] ?? 0;
                        handleQuantityChange('reimo-awning-rail', current > 0 ? 0 : 1);
                      }}
                    />
                    <LayoutCard 
                      title="FIAMMA F45S AWNING"
                      price={2500}
                      image="/Fiamma.png"
                      isSelected={(equipmentQuantities['fiamma-awning'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['fiamma-awning'] ?? 0;
                        handleQuantityChange('fiamma-awning', current > 0 ? 0 : 1);
                      }}
                    />
                    <LayoutCard 
                      title="SCENIC POP TOP CANVAS"
                      price={1400}
                      image="/Scenic.png"
                      isSelected={(equipmentQuantities['scenic-pop-top'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['scenic-pop-top'] ?? 0;
                        handleQuantityChange('scenic-pop-top', current > 0 ? 0 : 1);
                      }}
                    />
                  </div>

                  {/* Towing Section */}
                  <div ref={towingRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="DETACHABLE TOW BAR"
                      price={700}
                      description="Maximize Your Van's Rooftop Storage. This Rugged, No-Drill Aluminum Combo Safely Secures Heavy Gear And Provides Easy, Slip-Resistant Access."
                      isSelected={(equipmentQuantities['detachable-tow-bar'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['detachable-tow-bar'] ?? 0;
                        handleQuantityChange('detachable-tow-bar', current > 0 ? 0 : 1);
                      }}
                    />
                  </div>

                  {/* Lighting Section */}
                  <div ref={lightingRef} className="flex flex-col gap-4">
                    <LayoutCard 
                      title="LED FRONT & REAR LIGHTS"
                      price={2600}
                      image="/LED.png"
                      isSelected={(equipmentQuantities['led-lights'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['led-lights'] ?? 0;
                        handleQuantityChange('led-lights', current > 0 ? 0 : 1);
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {isExteriorStep && (
              <>
                <div className="flex justify-center gap-2 py-4 flex-shrink-0">
                  {/* {['PAINT & FINISH'].map((tab) => ( */}
                    <button
                  
                      // onClick={() => scrollToSection(tab)}
                      className={`
                        px-6 py-2 rounded-full text-[11px] font-bold tracking-widest transition-all
                        
                          ? 'bg-[#e05a41] text-white' 
                      `}
                    >
                      {/* {tab} */}
                    </button>
                  {/* ))} */}
                </div>

                <div
                  ref={scrollContainerRef}
                  className="
                    flex flex-col gap-6
                    flex-1 min-h-0 overflow-y-auto
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
                    pb-10
                  "
                >
                  <div ref={paintRef} className="flex flex-col gap-6">
                    <ColorGridCard
                      title="BUMPER COLOUR CODING"
                      price={2500}
                      options={BUMPER_COLORS}
                      selectedOptionId={selectedBumperColor}
                      isSelected={(equipmentQuantities['bumper-colour-coding'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['bumper-colour-coding'] ?? 0;
                        handleQuantityChange('bumper-colour-coding', current > 0 ? 0 : 1);
                      }}
                      onSelectOption={setSelectedBumperColor}
                    />

                    <ColorGridCard
                      title="DUAL TONE"
                      price={2500}
                      options={DUAL_TONE_COLORS}
                      selectedOptionId={selectedDualToneColor}
                      isSelected={(equipmentQuantities['dual-tone'] ?? 0) > 0}
                      onToggle={() => {
                        const current = equipmentQuantities['dual-tone'] ?? 0;
                        handleQuantityChange('dual-tone', current > 0 ? 0 : 1);
                      }}
                      onSelectOption={setSelectedDualToneColor}
                    />
                  </div>
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
        totalPrice={totalPrice}
      />

      <BuildSummaryModal
        open={summaryOpen}
        trailerType={selectedTrailerType}
        sizeOption={selectedSizeOption}
        equipmentItems={selectedEquipmentItems}
        vanSpecs={{
          model: vanModel,
          transmission: transmission,
          wheelbase: wheelbase,
        }}
        onClose={() => setSummaryOpen(false)}
      />
    </div>
  );
};
