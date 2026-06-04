import React from 'react';

interface TipBoxProps {
  children: React.ReactNode;
}

export const TipBox: React.FC<TipBoxProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-[32px] px-[24px] py-[12px] flex items-center gap-[8px] border border-[#e2e8f0]">
      <div className="bg-black rounded-full size-[26px] flex items-center justify-center shrink-0">
        <span className="text-white text-[12px] font-bold">i</span>
      </div>
      <p className="text-[#1b1b1b] text-[12px] font-semiBold leading-[1.32] tracking-[-0.3px]">
        {children}
      </p>
    </div>
  );
};
