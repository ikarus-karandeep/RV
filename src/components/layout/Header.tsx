import React from 'react';

interface HeaderProps {
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBack }) => {
  return (
    <header className="absolute top-[8px] left-[40px] flex items-center gap-[24px] z-10">
      {/* Back Button */}
      <button onClick={onBack} className="bg-[#111] rounded-[14.7px] size-[64px] flex items-center justify-center hover:bg-black transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Logo & Title */}
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center">
          <img 
            src="https://www.figma.com/api/mcp/asset/6b8f1127-8913-4bf2-a0ea-05676f90584d" 
            alt="Logo" 
            className="h-[54px] w-auto mr-[-12px]" 
          />
          <h1 className="text-[30.6px] font-medium tracking-[-1.22px] leading-[0.8]">
            Food Trailers
          </h1>
        </div>
        {/* <div className="pl-[10px]">
          <img 
            src="https://www.figma.com/api/mcp/asset/cb5adea2-ba2d-48c0-b474-c2fe8dff2256" 
            alt="Rating" 
            className="h-[20px] w-auto" 
          />
        </div> */}
      </div>
    </header>
  );
};
