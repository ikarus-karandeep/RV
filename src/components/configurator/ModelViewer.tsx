import React, { Suspense, useRef, useState, useEffect } from 'react';
import { useGLTF, OrbitControls, Stage, Center, Html, Environment } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps {
  url: string;
}

const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

interface CameraControllerProps {
  viewMode: 'exterior' | 'interior';
  controlsRef: React.RefObject<any>;
  setIsTransitioning: (val: boolean) => void;
}

const CameraController: React.FC<CameraControllerProps> = ({ viewMode, controlsRef, setIsTransitioning }) => {
  const { camera } = useThree();
  const lastViewMode = useRef<string>(viewMode);
  const isMoving = useRef<boolean>(true);

  // Trigger transition when viewMode changes
  if (viewMode !== lastViewMode.current) {
    lastViewMode.current = viewMode;
    isMoving.current = true;
    setIsTransitioning(true);
  }

  useFrame(() => {
    if (!controlsRef.current || !isMoving.current) return;

    const targetTarget = viewMode === 'interior' 
      ? new THREE.Vector3(0, 0.1, -1.0) 
      : new THREE.Vector3(0, 0, 0);

    const targetPosition = viewMode === 'interior' 
      ? new THREE.Vector3(0, 0.6, 0.6) 
      : new THREE.Vector3(5.5, 3.8, 5.5);

    const targetFov = viewMode === 'interior' ? 75 : 35;

    // Smoothly interpolate camera position, orbit target, and FOV
    camera.position.lerp(targetPosition, 0.035);
    controlsRef.current.target.lerp(targetTarget, 0.035);
    
    if (Math.abs(camera.fov - targetFov) > 0.1) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.035);
      camera.updateProjectionMatrix();
    }

    controlsRef.current.update();

    // Check if transition is complete
    const posDist = camera.position.distanceTo(targetPosition);
    const targetDist = controlsRef.current.target.distanceTo(targetTarget);
    const fovDist = Math.abs(camera.fov - targetFov);

    if (posDist < 0.01 && targetDist < 0.01 && fovDist < 0.2) {
      // Snap to final values, enable controls, and stop rendering updates
      camera.position.copy(targetPosition);
      controlsRef.current.target.copy(targetTarget);
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
      controlsRef.current.update();
      isMoving.current = false;
      setIsTransitioning(false);
    }
  });

  return null;
};

interface ModelViewerProps {
  modelUrls: string[];
  viewMode: 'exterior' | 'interior';
  environment?: string;
  onLoaded: () => void;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrls, viewMode, environment = 'city', onLoaded }) => {
  const controlsRef = useRef<any>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);

  // Trigger onLoaded after the component renders and completes mounting
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  if (modelUrls.length === 0) return null;

  return (
    <Suspense fallback={
      <Html center pointerEvents="none">
        <div className="w-[120px] h-[120px] flex items-center justify-center bg-transparent">
          <img src="/assets/loader.gif" alt="Loading..." className="w-full h-full object-contain" />
        </div>
      </Html>
    }>
      <Stage environment={null} intensity={0.6} contactShadow={true} shadowBias={-0.0015} adjustCamera={false}>
        <Center>
          {modelUrls.map((url) => (
            <Model key={url} url={url} />
          ))}
        </Center>
      </Stage>
      {environment && (
        environment.endsWith('.hdr') ? (
          <Environment files={environment} />
        ) : (
          <Environment preset={environment as any} />
        )
      )}
      <OrbitControls 
        ref={controlsRef} 
        makeDefault 
        enabled={!isTransitioning} // temporarily disable user input during transitions
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 1.75} 
      />
      <CameraController 
        viewMode={viewMode} 
        controlsRef={controlsRef} 
        setIsTransitioning={setIsTransitioning} 
      />
    </Suspense>
  );
};
