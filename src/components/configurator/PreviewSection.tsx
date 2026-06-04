import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ModelViewer } from './ModelViewer';

export const PreviewSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'exterior' | 'interior'>('exterior');
  const [isFading, setIsFading] = useState<boolean>(false);
  const [isModelLoading, setIsModelLoading] = useState<boolean>(true);
  const [modelUrls] = useState<string[]>([
    '/Base_Blue.glb',
    '/Base_Optimized5122.glb',
    '/Cabinet_1V1.glb',
    '/Shower_2.glb',
    '/Side_Cover.glb',
    '/Sofa_Chair_V1.glb',
    '/Tyre_1.glb'
  ]);
  const [showPhotoMenu, setShowPhotoMenu] = useState<boolean>(false);
  const [environment, setEnvironment] = useState<string>('city');

  const handleModeChange = (mode: 'exterior' | 'interior') => {
    if (mode === activeMode) return;
    setIsFading(true);
    setActiveMode(mode);
    setTimeout(() => {
      setIsFading(false);
    }, 900);
  };

  return (
    <div className="flex-1 min-h-0 h-full relative overflow-hidden">
      {/* Global Loader Overlay */}
      {isModelLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#f0f0ee]">
          <img src="/assets/loader.gif" alt="Loading..." className="w-[120px] h-[120px] object-contain" />
        </div>
      )}

      {/* Smooth Transition Fade Screen Overlay */}
      <div 
        className={`absolute inset-0 z-20 bg-[#f0f0ee] pointer-events-none transition-opacity duration-700 ${
          isFading ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Top Center Exterior/Interior Toggle Button */}
      <div className="absolute top-[22.5px] left-1/2 -translate-x-1/2 z-10 flex-shrink-0">
        <div className="bg-white rounded-[12px] p-1 flex items-center shadow-md border border-gray-100 h-[48px]">
          <button
            onClick={() => handleModeChange('exterior')}
            className={`px-5 h-full rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center ${
              activeMode === 'exterior'
                ? 'bg-[#1e1e1e] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 bg-transparent'
            }`}
          >
            Exterior
          </button>
          <button
            onClick={() => handleModeChange('interior')}
            className={`px-5 h-full rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center ${
              activeMode === 'interior'
                ? 'bg-[#1e1e1e] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 bg-transparent'
            }`}
          >
            Interior
          </button>
        </div>
      </div>

      {/* Top preview area */}
      <div className="w-full h-full">
        <Suspense fallback={null}>
          <Canvas shadows camera={{ position: [8, 8, 8], fov: 35 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-10, 10, 5]} intensity={0.5} />
            <ModelViewer modelUrls={modelUrls} viewMode={activeMode} environment={environment} onLoaded={() => setIsModelLoading(false)} />
          </Canvas>
        </Suspense>
      </div>

      {/* Floating control area over canvas */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-[12px] items-center">
          <div className="bg-white rounded-[12px] w-[50px] h-[50px] flex items-center justify-center cursor-pointer hover:bg-gray-50 active:scale-95 shadow-sm border border-gray-100 transition-all">
            <img src="/assets/CamperVan/eye.png" alt="Eye View" className="w-[20px] h-[20px] object-contain" />
          </div>

          <div className="relative">
            <div 
              onClick={() => setShowPhotoMenu(!showPhotoMenu)}
              className={`bg-white rounded-[12px] w-[50px] h-[50px] flex items-center justify-center cursor-pointer hover:bg-gray-50 active:scale-95 shadow-sm border border-gray-100 transition-all ${
                showPhotoMenu ? 'ring-2 ring-[#111827]' : ''
              }`}
            >
              <img src="/assets/CamperVan/photo.png" alt="Photo" className="w-[20px] h-[20px] object-contain" />
            </div>

            {showPhotoMenu && (
              <div className="absolute bottom-[62px] left-1/2 -translate-x-1/2 flex gap-[8px] transition-all animate-[summarySlideUp_0.2s_ease-out]">
                {[
                  { 
                    id: 'city', 
                    value: 'city',
                    icon: (
                      <svg className="w-[20px] h-[20px] text-[#4b5563]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                      </svg>
                    )
                  },
                  { 
                    id: 'exr', 
                    value: '/assets/environment/EXR.hdr',
                    icon: (
                      <svg className="w-[20px] h-[20px] text-[#4b5563]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.15" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                    )
                  },
                  { 
                    id: 'sunset', 
                    value: 'sunset',
                    icon: (
                      <svg className="w-[20px] h-[20px] text-[#4b5563]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 18a5 5 0 0 0-10 0" />
                        <line x1="12" y1="9" x2="12" y2="11" />
                        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                        <line x1="1" y1="18" x2="3" y2="18" />
                        <line x1="21" y1="18" x2="23" y2="18" />
                        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                        <line x1="23" y1="22" x2="1" y2="22" />
                      </svg>
                    )
                  }
                ].map((env) => {
                  const isActive = environment === env.value;
                  return (
                    <button
                      key={env.id}
                      onClick={() => setEnvironment(env.value)}
                      className={`bg-white border rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer hover:bg-gray-50 active:scale-95 transition-all shadow-md ${
                        isActive ? 'border-[#111827] ring-2 ring-[#111827]/10' : 'border-gray-100'
                      }`}
                    >
                      {env.icon}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white rounded-[12px] w-[50px] h-[50px] flex items-center justify-center cursor-pointer hover:bg-gray-50 active:scale-95 shadow-sm border border-gray-100 transition-all">
            <img src="/assets/CamperVan/measurement.png" alt="Measurements" className="w-[20px] h-[20px] object-contain" />
          </div>

          <div className="bg-white px-[24px] h-[50px] rounded-[12px] flex items-center shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 active:scale-95 transition-all">
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#111827]">
              VIEW IN YOUR DRIVEWAY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
