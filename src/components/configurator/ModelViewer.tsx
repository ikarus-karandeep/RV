import React, { Suspense } from 'react';
import { useGLTF, OrbitControls, Stage, Center } from '@react-three/drei';

interface ModelProps {
  url: string;
}

const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

interface ModelViewerProps {
  modelUrls: string[];
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrls }) => {
  if (modelUrls.length === 0) return null;

  return (
    <Suspense fallback={null}>
      <Stage environment="city" intensity={0.6} contactShadow={true} shadowBias={-0.0015}>
        <Center>
          {modelUrls.map((url) => (
            <Model key={url} url={url} />
          ))}
        </Center>
      </Stage>
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
    </Suspense>
  );
};


