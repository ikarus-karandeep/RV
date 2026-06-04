import React from 'react';

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const MountainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 17 9 3 15 13 19 9 21 17 3 17" />
  </svg>
);

const RulerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.3 8.7l-1.4 1.4-2.1-2.1-1.4 1.4 2.1 2.1-1.4 1.4-2.1-2.1-1.4 1.4 2.1 2.1-1.4 1.4-2.1-2.1-1.4 1.4 2.1 2.1-1.4 1.4L2.7 8.7a1 1 0 0 1 0-1.4l4.6-4.6a1 1 0 0 1 1.4 0l12.6 12.6" />
  </svg>
);

export const PreviewSection: React.FC = () => {
  return (
    <div className="flex-1 min-h-0 h-full flex flex-col overflow-hidden">
      
      {/* Top preview area */}
      <div className="flex-1 min-h-0 flex items-center justify-center relative">
        <div className="w-full max-w-[760px] h-full max-h-[520px] flex items-center justify-center">
          <img
            src="https://www.figma.com/api/mcp/asset/8febc3e6-2d17-4a52-a1c7-2d9675eb7406"
            alt="Trailer Preview"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Bottom control area */}
      <div className="flex-shrink-0 flex justify-center">
        <div className="flex gap-[16px] items-center">
          <div className="bg-white rounded-[8px] size-[50px] flex items-center justify-center cursor-pointer hover:bg-gray-50 shadow-sm border border-[#e5e7eb]">
            <EyeIcon />
          </div>

          <div className="bg-white rounded-[8px] size-[50px] flex items-center justify-center cursor-pointer hover:bg-gray-50 shadow-sm border border-[#e5e7eb]">
            <MountainIcon />
          </div>

          <div className="bg-white rounded-[8px] size-[50px] flex items-center justify-center cursor-pointer hover:bg-gray-50 shadow-sm border border-[#e5e7eb]">
            <RulerIcon />
          </div>

          <div className="bg-white h-[44px] px-[20px] rounded-[22px] flex items-center shadow-sm border border-[#e5e7eb] cursor-pointer hover:bg-gray-50">
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#111827]">
              VIEW IN YOUR DRIVEWAY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};