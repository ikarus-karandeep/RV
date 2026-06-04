import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  useGLTF,
  CameraControls,
  Stage,
  Html,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ModelProps {
  url: string;
  environment?: string;
}

const Model: React.FC<ModelProps> = ({ url, environment }) => {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        if (child.name.startsWith("Plane001")) {
          child.visible = !environment?.endsWith(".hdr");
        }
      }
    });
  }, [scene, url, environment]);

  return <primitive object={scene} />;
};

interface CameraControllerProps {
  viewMode: "exterior" | "interior";
  controlsRef: React.RefObject<any>;
  modelGroupRef: React.RefObject<THREE.Group | null>;
  setIsTransitioning: (val: boolean) => void;
}

const CameraController: React.FC<CameraControllerProps> = ({
  viewMode,
  controlsRef,
  modelGroupRef,
  setIsTransitioning,
}) => {
  const { camera } = useThree();

  useEffect(() => {
    if (!controlsRef.current) return;
    if (!modelGroupRef.current) return;

    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    if (!perspectiveCamera.isPerspectiveCamera) return;

    const box = new THREE.Box3().setFromObject(
      modelGroupRef.current
    );

    const center = box.getCenter(
      new THREE.Vector3()
    );

    const size = box.getSize(
      new THREE.Vector3()
    );

    const maxDimension = Math.max(
      size.x,
      size.y,
      size.z
    );

    let targetPosition: number[];

    if (viewMode === "interior") {
      targetPosition = [
        center.x,
        center.y + maxDimension * 0.1,
        center.z + maxDimension * 0.25,
      ];
    } else {
      const distance = maxDimension * 1.8;

      targetPosition = [
        center.x + distance,
        center.y + distance * 0.6,
        center.z + distance,
      ];
    }

    const targetFov =
      viewMode === "interior"
        ? 75
        : 35;

    setIsTransitioning(true);

    const animateFov = () => {
      if (
        Math.abs(perspectiveCamera.fov - targetFov) > 0.5
      ) {
        perspectiveCamera.fov = THREE.MathUtils.lerp(
          perspectiveCamera.fov,
          targetFov,
          0.1
        );

        perspectiveCamera.updateProjectionMatrix();

        requestAnimationFrame(
          animateFov
        );
      } else {
        perspectiveCamera.fov = targetFov;
        perspectiveCamera.updateProjectionMatrix();
      }
    };

    animateFov();

    controlsRef.current
      .setLookAt(
        targetPosition[0],
        targetPosition[1],
        targetPosition[2],

        center.x,
        center.y,
        center.z,

        true
      )
      .then(() => {
        setIsTransitioning(false);
      });
  }, [
    viewMode,
    camera,
    controlsRef,
    modelGroupRef,
    setIsTransitioning,
  ]);

  return null;
};

interface ModelViewerProps {
  modelUrls: string[];
  viewMode: "exterior" | "interior";
  environment?: string;
  onLoaded: () => void;
}

export const ModelViewer: React.FC<
  ModelViewerProps
> = ({
  modelUrls,
  viewMode,
  environment = "city",
  onLoaded,
}) => {
  const controlsRef = useRef<any>(
    null
  );

  const modelGroupRef =
    useRef<THREE.Group>(null);

  const [
    isTransitioning,
    setIsTransitioning,
  ] = useState(true);

  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  if (modelUrls.length === 0)
    return null;

  const stageEnvironment =
    environment.endsWith(".hdr")
      ? {
          files: environment,
          background: true,
          ground: {
            radius: 100,
            height: 5,
            scale: 100,
          },
        }
      : {
          preset: environment as any,
          background: false,
        };

    const isCenterDisable = environment?.endsWith('.hdr')?true : false

  return (
    <Suspense
      fallback={
        <Html center>
          <div className="w-[120px] h-[120px] flex items-center justify-center">
            <img
              src="/assets/loader.gif"
              alt="loading"
              className="w-full h-full"
            />
          </div>
        </Html>
      }
    >
      <Stage
        adjustCamera={false}
        center={{ disable: isCenterDisable }}
        environment={
          stageEnvironment as any
        }
        intensity={0.6}
        shadows={environment?.endsWith('.hdr') ? false : { type: 'contact', bias: -0.0015 }}
      >
        <group ref={modelGroupRef}>
          {modelUrls.map((url) => (
            <Model
              key={url}
              url={url}
              environment={environment}
            />
          ))}
        </group>
      </Stage>

      <CameraControls
        ref={controlsRef}
        makeDefault
        enabled={!isTransitioning}
        minPolarAngle={0}
        maxPolarAngle={
          Math.PI / 2.25
        }
        smoothTime={0.5}
      />

      <CameraController
        viewMode={viewMode}
        controlsRef={controlsRef}
        modelGroupRef={
          modelGroupRef
        }
        setIsTransitioning={
          setIsTransitioning
        }
      />
    </Suspense>
  );
};