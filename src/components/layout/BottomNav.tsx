import React from 'react';
import { STEPS } from '../../utils/constants';

interface BottomNavProps {
  currentStepId: string;
  onStepChange: (stepId: string) => void;
  onBuildSummary: () => void;
  totalPrice?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentStepId,
  onStepChange,
  onBuildSummary,
  totalPrice = 0,
}) => {
  return (
    <div className="w-full pb-4 flex flex-col md:flex-row items-stretch md:items-center justify-between flex-shrink-0 bg-transparent font-inter select-none">
      {/* Left side: White floating steps bar (w-[74%] wrapper matching Preview area) */}
      <div className="w-[74%] pl-[20px] flex-shrink-0">
        <div className="w-full bg-white rounded-[12px] border border-[#e5e7eb] shadow-sm p-1.5 flex items-center h-[68px] overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                      ? 'text-white'
                      : 'text-[#9ca3af] hover:text-[#374151] bg-transparent'}
                  `}
                  style={isActive ? { background: 'radial-gradient(circle, #ff7152 0%, #db5a42 100%)' } : undefined}
                >
                  {step.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right side: Build Summary + Connect With Us button (w-[26%] wrapper matching Configurator side panel) */}
      <div className="w-[26%] px-[20px] flex items-center gap-3 flex-shrink-0 justify-end h-[68px]">
        <button
          type="button"
          onClick={onBuildSummary}
          className="bg-[#18181b] text-white rounded-[12px] px-6 h-full text-[12px] uppercase tracking-wider font-bold whitespace-nowrap hover:bg-zinc-800 active:scale-98 transition-all cursor-pointer flex-1 flex items-center justify-center gap-4"
        >
          <span>Summary &middot; ${totalPrice.toLocaleString()}</span>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </button>
        <button
          type="button"
          className="bg-white border border-[#e5e7eb] text-[#111827] rounded-[12px] px-6 h-full text-[12px] uppercase tracking-wider font-bold whitespace-nowrap hover:bg-gray-50 active:scale-98 transition-all cursor-pointer flex-1"
        >
          Connect With Us
        </button>
      </div>
    </div>
  );
};
