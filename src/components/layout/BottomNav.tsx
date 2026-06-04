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
    <nav className="bg-white border-t border-[#e5e7eb] min-h-[72px] lg:min-h-[88px] flex items-center px-[8px] gap-[2px]">
      {/* Step buttons */}
      <div className="flex items-center flex-1 overflow-x-auto gap-[2px]">
        {STEPS.map((step) => {
          const isActive = step.id === currentStepId;
          return (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={`
                px-[18px] py-[14px] rounded-[8px] whitespace-nowrap uppercase tracking-[0.9px] text-[14px] transition-all flex-shrink-0
                ${isActive
                  ? 'text-white bg-[#111827]'
                  : 'text-[#9ca3af] bg-transparent hover:bg-gray-50 hover:text-[#374151]'}
              `}
            >
              {step.label}
            </button>
          );
        })}
      </div>

      {/* Right: Build Summary + Save */}
      <div className="flex items-center gap-[8px] flex-shrink-0 pl-[8px]">
        <button
          type="button"
          onClick={onBuildSummary}
          className="bg-[#111827] text-white rounded-[8px] px-[24px] h-fit text-[14px] py-[14px] uppercase tracking-[0.9px] whitespace-nowrap hover:bg-black transition-colors"
        >
          Build Summary
        </button>
        <div className="bg-[#f5f5f3] border border-[#e5e7eb] rounded-[8px] size-[42px] flex items-center justify-center cursor-pointer hover:bg-gray-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>
    </nav>
  );
};
