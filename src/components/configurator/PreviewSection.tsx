import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ModelViewer } from './ModelViewer';

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
        <div className="flex gap-[16px] items-center">
          <div className="bg-white/80 backdrop-blur-md rounded-[8px] size-[50px] flex items-center justify-center cursor-pointer hover:bg-white shadow-lg border border-[#e5e7eb]/50 transition-all">
            <EyeIcon />
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-[8px] size-[50px] flex items-center justify-center cursor-pointer hover:bg-white shadow-lg border border-[#e5e7eb]/50 transition-all">
            <MountainIcon />
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-[8px] size-[50px] flex items-center justify-center cursor-pointer hover:bg-white shadow-lg border border-[#e5e7eb]/50 transition-all">
            <RulerIcon />
          </div>

          <div className="bg-white/80 backdrop-blur-md h-[44px] px-[20px] rounded-[22px] flex items-center shadow-lg border border-[#e5e7eb]/50 cursor-pointer hover:bg-white transition-all">
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#111827]">
              VIEW IN YOUR DRIVEWAY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
