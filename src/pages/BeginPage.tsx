import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CamperVanCard {
  id: string;
  title: string;
  description: string;
  image: string;
  brandImage: string;
  price: string;
  models: string[];
}

export const BeginPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState<string>('adventurer');
  const [showBanner, setShowBanner] = useState<boolean>(true);
  
  // Model selection state for each campervan card
  const [cardSelectedModels, setCardSelectedModels] = useState<Record<string, string>>({
    expedition: 'T5.1 (2010-15)',
    sport: 'T5.1 (2010-15)',
    adventurer: 'T5.1 (2010-15)',
  });

  const camperVans: CamperVanCard[] = [
    {
      id: 'expedition',
      title: 'Expedition',
      description: 'Standard conversion package providing all you need for your upcoming adventures.',
      image: '/assets/CamperVan/image 64.png',
      brandImage: '/assets/CamperVan/Frame 1984078809.png',
      price: 'From*$ 120',
      models: ['T5.1 (2010-15)', 'T6 (2015-18)', 'T6.1 (2018-)'],
    },
    {
      id: 'sport',
      title: 'Sport',
      description: 'When a slick sports bodykit meets the premium standard of a Spartan luxury interior.',
      image: '/assets/CamperVan/image 63.png',
      brandImage: '/assets/CamperVan/Frame 1984078809.png',
      price: 'From*$ 120',
      models: ['T5.1 (2010-15)', 'T6 (2015-18)', 'T6.1 (2018-)'],
    },
    {
      id: 'adventurer',
      title: 'Adventurer',
      description: 'An all terrain swamper fit for anything your expeditions & adventurers might throw at you.',
      image: '/assets/CamperVan/image 62.png',
      brandImage: '/assets/CamperVan/Frame 1984078809.png',
      price: 'From*$ 120',
      models: ['T5.1 (2010-15)', 'T6 (2015-18)', 'T6.1 (2018-)'],
    },
  ];

  const handleModelSelect = (cardId: string, model: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardSelectedModels(prev => ({
      ...prev,
      [cardId]: model
    }));
  };

  const handleNextClick = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to configurator page with selected model/type details
    navigate('/configuration', { 
      state: { 
        camperVanId: cardId, 
        model: cardSelectedModels[cardId] 
      } 
    });
  };

  return (
    <div className="relative h-screen max-h-screen bg-[#f5f5f5] flex flex-col font-inter overflow-hidden select-none pb-6">
      {/* Top Header */}
      <header className="w-full max-w-[70dvw] mx-auto px-6 pt-6 pb-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          {/* Back button */}
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 bg-black text-white rounded-[12px] flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95 hover:opacity-90 shadow-sm"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="2.5" 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          
          {/* Brand Titles */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[26px] font-bold text-[#111827] tracking-tight leading-none">
              Discover the Range
            </h1>
            <img 
              src="/assets/CamperVan/powered-by.png" 
              alt="Powered by Ikarus Delta" 
              className="h-[12px] object-contain self-start"
            />
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-1 min-h-0 w-full max-w-[70dvw] mx-auto px-6 py-4 flex items-center justify-center overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-full items-stretch max-h-[65vh]">
          {camperVans.map((van) => {
            const isActive = selectedCardId === van.id;
            return (
              <div
                key={van.id}
                onClick={() => setSelectedCardId(van.id)}
                className={`relative flex flex-col bg-white rounded-[20px] pt-6 pl-6 pb-6 pr-0 overflow-hidden cursor-pointer transition-all duration-300 min-h-0 h-full justify-between ${
                  isActive 
                    ? 'ring-2 ring-[#111827] scale-[1.01] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.12)] z-10' 
                    : 'opacity-65 hover:opacity-90 shadow-[0_8px_30px_rgb(0,0,0,0.03)]'
                }`}
              >
                {/* Brand Logo & Name */}
                <div className="flex items-center mb-3 flex-shrink-0 pr-6">
                  <img 
                    src={van.brandImage} 
                    alt="Volkswagen" 
                    className={`h-[90px] w-auto object-contain object-left ${isActive ? '' : 'grayscale'}`}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* <span className="vw-fallback-logo hidden text-sm font-semibold text-gray-800 ml-2">
                    Volkswagen
                  </span> */}
                </div>

                {/* Campervan Image & Shadow - responsive flexbox */}
                <div className="relative flex-[1.3] min-h-0 flex items-center justify-end mb-2 w-full select-none pointer-events-none">
                  <img 
                    src={van.image} 
                    alt={van.title} 
                    className="h-[125%] max-h-[125%] w-auto object-contain object-right translate-x-[22%] translate-y-[-2%] transition-transform duration-500 hover:scale-[1.05]"
                  />
                </div>

                {/* Info and Titles */}
                <div className="flex flex-col flex-shrink-0 mt-auto pr-6">
                  <h2 className={`text-[30px] font-bold tracking-tight text-[#111827] ${isActive ? '' : 'text-[#4b5563]'}`}>
                    {van.title}
                  </h2>
                  <p className="text-[12px] text-gray-400 mt-1.5 leading-relaxed font-medium min-h-[36px] line-clamp-2">
                    {van.description}
                  </p>

                  {/* Engine Model Year Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {van.models.map((model) => {
                      const isModelSelected = cardSelectedModels[van.id] === model;
                      return (
                        <button
                          key={model}
                          onClick={(e) => handleModelSelect(van.id, model, e)}
                          className={`px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wide transition-colors cursor-pointer ${
                            isModelSelected
                              ? isActive 
                                ? 'bg-[#2a3547] text-white' 
                                : 'bg-[#9ca3af] text-white'
                              : 'bg-[#e5e7eb] text-[#6b7280] hover:bg-[#d1d5db]'
                          }`}
                        >
                          {model}
                        </button>
                      );
                    })}
                  </div>

                  {/* Price Info */}
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className={`text-[16px] tracking-tight ${isActive ? 'font-extrabold text-[#111827]' : 'font-semibold text-gray-500'}`}>
                      {van.price.split('*')[0]}
                    </span>
                    {van.price.includes('*') && (
                      <>
                        <span className="text-[11px] text-gray-400 font-bold">*</span>
                        <span className={`text-[16px] tracking-tight ${isActive ? 'font-extrabold text-[#111827]' : 'font-semibold text-gray-500'}`}>
                          {van.price.split('*')[1]}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-4 flex items-center gap-3">
                    {/* Settings Gear Button */}
                    <button 
                      className={`p-2.5 rounded-[10px] flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'border-gray-300 hover:border-gray-500 bg-white text-gray-700 active:scale-95' 
                          : 'border-gray-200 bg-white/50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="2" 
                        stroke="currentColor" 
                        className="w-4.5 h-4.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.936 6.936 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      </svg>
                    </button>

                    {/* Next Button */}
                    <button 
                      onClick={(e) => handleNextClick(van.id, e)}
                      className={`flex-1 py-2.5 px-5 rounded-[10px] flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-[#db5a42] hover:bg-[#c94f38] text-white shadow-[0_4px_12px_rgba(219,90,66,0.25)] active:scale-98' 
                          : 'bg-[#e8a89a]/40 text-[#ffffff] cursor-not-allowed opacity-90'
                      }`}
                    >
                      Next
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="3" 
                        stroke="currentColor" 
                        className="w-3.5 h-3.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Sticky banner */}
      {showBanner && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-6 animate-[summarySlideUp_0.4s_ease-out]">
          <div className="bg-white border border-[#e5e7eb] rounded-[16px] py-3.5 px-6 shadow-[0_10px_25px_rgba(0,0,0,0.06)] flex items-center justify-between gap-4">
            <p className="text-[12.5px] text-black font-semibold tracking-tight text-center md:text-left leading-normal">
              Building your own custom camper is easy, get started with one of our base models from the original Spartan range.
            </p>
            <button 
              onClick={() => setShowBanner(false)}
              className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center hover:opacity-85 active:scale-95 cursor-pointer flex-shrink-0 transition-all"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="2.5" 
                stroke="currentColor" 
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
