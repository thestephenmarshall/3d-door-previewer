import { Suspense } from "react";
import { Camera, Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Html } from "@react-three/drei";
import { AxesHelper, Vector3, PCFSoftShadowMap } from "three";
import Model from "../Model";
import NativeModel from "../NativeModel";
import CameraControls from "../CameraControls";
// import Lights from "../Lights";
// import DoorShadow from "./DoorShadow";

import { usePrevious } from "../../hooks/usePrevious";

import { LoadingInline } from "playbook-ui";

import {
  ColorSelection,
  DoorWidth,
  TextureSelection,
  Descriptor
} from "../../types";

const MODEL_SCALE = 0.02;

const INITIAL_CAMERA_PROPS: Camera & any = {
  far: 500,
  fov: 35,
  position: new Vector3(0, 0, 10),
  rotation: new Vector3(0, 0, 0),
  shadows: {
    type: PCFSoftShadowMap
  }
};

const Viewer = ({
  debug = false,
  focus = "door",
  selections,
  shadows = true,
  width = "normal"
}: {
  debug?: boolean;
  focus?: string;
  selections: Descriptor[][];
  shadows?: boolean;
  width?: DoorWidth;
}) => {
  const prevFocalPoint = usePrevious(focus);

  const selectedModels = selections.map((selections) => {
    const colorFile = selections.filter(
      (s) => s.type === "color"
    )[0] as ColorSelection;
    const color = colorFile?.value;
    const roughness = colorFile?.roughness || 0;
    const clearcoat = colorFile?.clearcoat || 0;
    const metalness = colorFile?.metalness || 0;
    const textureFile = selections.filter(
      (s) => s.type === "map"
    )[0] as TextureSelection;
    const texture = textureFile?.url;
    const textureRotation = textureFile?.rotation || 0;

    return selections.map(
      ({
        materialSide,
        url,
        position,
        type,
        scale = MODEL_SCALE,
        nativeMaterials
      }: Descriptor & any) => {
        const modelProps = { shadows };

        if (type !== "structure") return null;
        if (nativeMaterials) {
          return (
            <group key={url} position={position} scale={scale}>
              <Suspense fallback={"loading"}>
                <NativeModel url={url} />
              </Suspense>
            </group>
          );
        } else {
          return (
            <group key={url} position={position} scale={scale}>
              <Suspense fallback={"Loading..."}>
                <Model
                  color={color}
                  url={url}
                  roughness={roughness}
                  texture={texture}
                  textureRotation={textureRotation}
                  clearcoat={clearcoat}
                  materialSide={materialSide}
                  metalness={metalness}
                  {...modelProps}
                />
              </Suspense>
            </group>
          );
        }
      }
    );
  });

  return (
    <Canvas camera={INITIAL_CAMERA_PROPS} shadows={shadows}>
      <CameraControls
        focalPoint={focus}
        onFreeForm={(x: number) => null}
        prevFocalPoint={prevFocalPoint}
        shouldAnimate
      />
      {/* <Lights debug={debug} castShadow={shadows} intensity={0.8} /> */}
      {/* <spotLight
        angle={0.03}
        castShadow={shadows}
        distance={1000}
        position={[0, 20, 20]}
        power={1}
      /> */}
      {/* <pointLight castShadow position={[0, 20, 40]} intensity={0.6} /> */}
      <directionalLight
        intensity={0.3}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        position={[0, 4, 10]}
      />
      <directionalLight
        intensity={1}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        position={[0, 6, -10]}
      />
      {debug && <primitive object={new AxesHelper(10)} />}
      {shadows && (
        <ContactShadows
          frames={20}
          opacity={1}
          scale={6}
          blur={1.3}
          far={40}
          resolution={512}
          color="#000000"
          position={[0, -2, 0]}
        />
      )}
      {selectedModels}
      <Suspense
        fallback={
          <Html>
            <LoadingInline align="center" />
          </Html>
        }
      >
        <Environment near={1} far={100} resolution={256} preset="warehouse" />
      </Suspense>
    </Canvas>
  );
};

export default Viewer;
