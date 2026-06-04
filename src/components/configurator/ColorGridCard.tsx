import React from 'react';

interface ColorOption {
  id: string;
  label: string;
  color: string;
  isDualTone?: boolean;
  bottomColor?: string;
  isLight?: boolean; // for dark text on light swatches
}

interface ColorGridCardProps {
  title: string;
  price: number;
  options: ColorOption[];
  selectedOptionId?: string;
  isSelected: boolean;
  onToggle: () => void;
  onSelectOption: (optionId: string) => void;
}

export const ColorGridCard: React.FC<ColorGridCardProps> = ({
  title,
  price,
  options,
  selectedOptionId,
  isSelected,
  onToggle,
  onSelectOption,
}) => {
  return (
    <div
      className={`
        relative w-full rounded-2xl p-6 transition-all duration-300
        ${isSelected ? 'border-2 border-[#f2a99a] bg-gradient-to-t from-[#fdf2f0] to-white' : 'border-2 border-transparent bg-white'}
        shadow-[0_2px_12px_rgba(0,0,0,0.07)]
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[13px] font-bold text-[#111827] tracking-[0.12em] uppercase">
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-[15px] font-medium text-[#111827]">
            +${price.toLocaleString()}
          </span>
          <button
  onClick={onToggle}
  className={`
    w-8 h-8 rounded-full border flex items-center justify-center
    transition-all duration-200 text-sm font-medium
    ${isSelected
      ? 'bg-[#f2a99a] border-[#f2a99a] text-white'
      : 'bg-white border-gray-300 text-gray-600'}
  `}
>
  {isSelected ? '✓' : '+'}
</button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectOption(option.id)}
            className={`
              relative rounded-xl overflow-hidden transition-all duration-150
              shadow-sm
              ${selectedOptionId === option.id
                ? 'outline outline-[3px] outline-[#f2a99a] outline-offset-2'
                : 'hover:scale-[1.02]'}
            `}
          >
            {option.isDualTone ? (
              /* Dual tone: label on top (light bg), color bar below */
              <div className="flex flex-col">
                <div className="bg-[#f4f4f2] px-2.5 py-2 text-left">
                  <span className="text-[11px] font-medium text-[#111827] leading-tight">
                    {option.label}
                  </span>
                </div>
                <div
                  className="h-10 w-full"
                  style={{ backgroundColor: option.bottomColor }}
                />
              </div>
            ) : (
              /* Solid bumper swatch: full color fill, centered label */
              <div
                className="h-[78px] w-full flex items-center justify-center px-3 text-center"
                style={{ backgroundColor: option.color }}
              >
                <span
                  className={`text-[11px] font-medium leading-snug ${
                    option.isLight ? 'text-[#111827]' : 'text-white'
                  }`}
                  style={{ textShadow: option.isLight ? 'none' : '0 1px 2px rgba(0,0,0,0.18)' }}
                >
                  {option.label}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Example usage / demo ────────────────────────────────────────────────────

const bumperOptions: ColorOption[] = [
  { id: 'deep-pearl-black',  label: 'Deep Pearl Black', color: '#1e1e1e' },
  { id: 'cherry-red',        label: 'Cherry Red',       color: '#9b1b2a' },
  { id: 'copper-bronze',     label: 'Copper Bronze',    color: '#8b6651' },
  { id: 'bright-orange',     label: 'Bright Orange',    color: '#f5931e' },
  { id: 'bay-leaf-green',    label: 'Bay Leaf Green',   color: '#2a9878' },
  { id: 'candy-white',       label: 'Candy White',      color: '#e8e8e4', isLight: true },
  { id: 'starlight-blue',    label: 'Starlight Blue',   color: '#3d4f67' },
  { id: 'ravenna-blue',      label: 'Ravenna Blue',     color: '#1a3bcc' },
  { id: 'bright-yellow',     label: 'Bright Yellow',    color: '#f0bb2e', isLight: true },
  { id: 'ascot-grey',        label: 'Ascot Grey',       color: '#adadA0', isLight: true },
  { id: 'bamboo-green',      label: 'Bamboo Green',     color: '#2b7070' },
  { id: 'custom',            label: 'Custom',           color: '#636363' },
];

const dualToneOptions: ColorOption[] = [
  { id: 'dt-cherry-red',     label: 'Cherry Red',     isDualTone: true, color: '', bottomColor: '#9b1b2a' },
  { id: 'dt-copper-bronze',  label: 'Copper Bronze',  isDualTone: true, color: '', bottomColor: '#8b6651' },
  { id: 'dt-military-green', label: 'Military Green', isDualTone: true, color: '', bottomColor: '#7d8c45' },
  { id: 'dt-bright-yellow',  label: 'Bright Yellow',  isDualTone: true, color: '', bottomColor: '#f0bb2e' },
  { id: 'dt-squirrel-grey',  label: 'Squirrel Grey',  isDualTone: true, color: '', bottomColor: '#bdd0d8' },
  { id: 'dt-indium-grey',    label: 'Indium Grey',    isDualTone: true, color: '', bottomColor: '#636878' },
];

export default function App() {
  const [bumperSelected, setBumperSelected] = React.useState(true);
  const [bumperOption, setBumperOption] = React.useState('deep-pearl-black');
  const [dualSelected, setDualSelected] = React.useState(true);
  const [dualOption, setDualOption] = React.useState('dt-cherry-red');

  return (
    <div className="bg-[#f0f0ee] min-h-screen p-6 flex flex-col gap-5 max-w-xl mx-auto">
      <ColorGridCard
        title="Bumper Colour Coding"
        price={2500}
        options={bumperOptions}
        selectedOptionId={bumperOption}
        isSelected={bumperSelected}
        onToggle={() => setBumperSelected(s => !s)}
        onSelectOption={setBumperOption}
      />
      <ColorGridCard
        title="Dual Tone"
        price={2500}
        options={dualToneOptions}
        selectedOptionId={dualOption}
        isSelected={dualSelected}
        onToggle={() => setDualSelected(s => !s)}
        onSelectOption={setDualOption}
      />
    </div>
  );
}