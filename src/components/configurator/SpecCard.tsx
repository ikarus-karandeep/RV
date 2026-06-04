import React from 'react';

interface SpecCardProps {
  title: string;
  children: React.ReactNode;
  footer?: {
    label: string;
    value: string;
  };
}

export const SpecCard: React.FC<SpecCardProps> = ({ title, children, footer }) => {
  return (
    <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[12px] uppercase tracking-wider">{title}</h3>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6" />
          <path d="M9 21H3v-6" />
          <path d="M21 3l-7 7" />
          <path d="M3 21l7-7" />
        </svg>
      </div>

      <div className="flex justify-center">
        {children}
      </div>

      {footer && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-[12px] uppercase tracking-widest">{footer.label}</span>
          <span className="text-[12px] uppercase">{footer.value}</span>
        </div>
      )}
    </div>
  );
};

interface ToggleGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({ options, value, onChange }) => {
  return (
    <div className="bg-gray-100/80 p-1 rounded-full flex w-full">
      {options.map((option) => {
        const isSelected = option === value;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`
              flex-1 py-3 px-4 rounded-full text-[12px] uppercase transition-all duration-300
              ${isSelected 
                ? 'bg-[#111827] text-white shadow-md scale-[1.02]' 
                : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
