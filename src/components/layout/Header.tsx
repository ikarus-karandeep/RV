import React from 'react';

interface HeaderProps {
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBack }) => {
  return (
    <header className="absolute top-[20px] left-[35px] flex items-center gap-[24px] z-10">
      {/* Back Button */}
      <button onClick={onBack} className="bg-[#111] rounded-[14.7px] size-[54px] flex items-center justify-center hover:bg-black transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Logo & Title */}
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center">
          <img 
            src="/assets/CamperVan/powered-by.png" 
            alt="Logo" 
            className="h-[20px] w-auto mr-[-12px]" 
          />
          
        </div>
        
      </div>
    </header>
  );
};
