import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ModelViewer } from './ModelViewer';



export const PreviewSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [modelUrls] = useState<string[]>([
    '/Base_Blue.glb',
    '/Base_Optimized5122.glb',
    '/Cabinet_1V1.glb',
    '/Shower_2.glb',
    '/Side_Cover.glb',
    '/Sofa_Chair_V1.glb',
    '/Tyre_1.glb'
  ]);

  return (
    <div className="flex-1 min-h-0 h-full relative overflow-hidden">
      {/* Top Center Exterior/Interior Toggle Button */}
      <div className="absolute top-[22.5px] left-1/2 -translate-x-1/2 z-10 flex-shrink-0">
        <div className="bg-white rounded-[12px] p-1 flex items-center shadow-md border border-gray-100 h-[48px]">
          <button
            onClick={() => setViewMode('exterior')}
            className={`px-5 h-full rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center ${
              viewMode === 'exterior'
                ? 'bg-[#1e1e1e] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 bg-transparent'
            }`}
          >
            Exterior
          </button>
          <button
            onClick={() => setViewMode('interior')}
            className={`px-5 h-full rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center ${
              viewMode === 'interior'
                ? 'bg-[#1e1e1e] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 bg-transparent'
            }`}
          >
            Interior
          </button>
        </div>
      </div>

      {/* Top preview area */}
      <div className="w-full h-full cursor-move">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 bg-gray-50/50 backdrop-blur-sm z-0">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-[#111827] rounded-full animate-spin"></div>
              <span>Loading 3D Experience...</span>
            </div>
          </div>
        }>
          <Canvas shadows camera={{ position: [8, 8, 8], fov: 35 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-10, 10, 5]} intensity={0.5} />
            <ModelViewer modelUrls={modelUrls} />
          </Canvas>
        </Suspense>
      </div>

      {/* Floating control area over canvas */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-[12px] items-center">
          <div className="bg-white rounded-[12px] w-[50px] h-[50px] flex items-center justify-center cursor-pointer hover:bg-gray-50 active:scale-95 shadow-sm border border-gray-100 transition-all">
            <img src="/assets/CamperVan/eye.png" alt="Eye View" className="w-[20px] h-[20px] object-contain" />
          </div>

          <div className="bg-white rounded-[12px] w-[50px] h-[50px] flex items-center justify-center cursor-pointer hover:bg-gray-50 active:scale-95 shadow-sm border border-gray-100 transition-all">
            <img src="/assets/CamperVan/photo.png" alt="Photo" className="w-[20px] h-[20px] object-contain" />
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
