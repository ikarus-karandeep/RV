import React from 'react';
import { STEPS } from '../../utils/constants';

interface BottomNavProps {
  currentStepId: string;
  onStepChange: (stepId: string) => void;
  onBuildSummary: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentStepId,
  onStepChange,
  onBuildSummary,
}) => {
  return (
    <div className="w-full max-w-[97.5dvw] mx-auto pb-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 flex-shrink-0 bg-transparent font-inter select-none">
      {/* Left side: White floating steps bar */}
      <div className="w-[72%] 2xl: w-[77.5%] bg-white rounded-[12px] border border-[#e5e7eb] shadow-sm p-1.5 flex items-center h-[68px] overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-shrink-0">
        <div className="flex items-center w-full justify-between gap-1 h-full">
          {STEPS.map((step) => {
            const isActive = step.id === currentStepId;
            return (
              <button
                key={step.id}
                onClick={() => onStepChange(step.id)}
                className={`
                  px-5 h-full rounded-[8px] whitespace-nowrap uppercase tracking-[0.5px] text-[12px] font-bold transition-all cursor-pointer flex-1 text-center flex items-center justify-center
                  ${isActive
                    ? 'text-white bg-[#db5a42]'
                    : 'text-[#9ca3af] hover:text-[#374151] bg-transparent'}
                `}
              >
                {step.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: Build Summary + Save button with Container.png icon */}
      <div className="w-[27.5%] 2xl:w-[22.5%] flex items-center gap-3 flex-shrink-0 justify-end h-[68px]">
        <button
          type="button"
          onClick={onBuildSummary}
          className="bg-[#111827] text-white rounded-[12px] px-8 h-full text-[12px] uppercase tracking-wider font-bold whitespace-nowrap hover:bg-[#1f2937] active:scale-98 transition-all cursor-pointer flex-1"
        >
          Build Summary
        </button>
        <button
          type="button"
          className="bg-white border border-[#e5e7eb] rounded-[12px] w-[68px] h-full flex items-center justify-center cursor-pointer hover:bg-gray-50 active:scale-95 transition-all shadow-sm flex-shrink-0"
        >
          <img 
            src="/assets/CamperVan/Container.png" 
            alt="Save" 
            className="w-[20px] h-[20px] object-contain"
          />
        </button>
      </div>
    </div>
  );
};
