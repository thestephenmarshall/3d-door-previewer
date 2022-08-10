import React, { useEffect, useRef, useState } from "react";

import { Vector3 } from "three";
import { extend, useFrame, useThree, Object3DNode } from "@react-three/fiber";
import { useSpring } from "react-spring";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OrbitControlsProps } from "@react-three/drei";
import { AxesType, CameraControlsType } from "../../types";
import {
  SPRING_CONFIG,
  CAMERA_FOV,
  DOOR_POSITIONS,
  HANDLE_POSITIONS,
  GLASS_POSITIONS
} from "./config";

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

const CAMERA_LOOKAT: { [key: string]: Vector3 } = {};
const CAMERA_POSITIONS: { [key: string]: Vector3 | any } = {};

const setSpringAnimation = ({ camera, fp, prevFocalPoint }: any) => {
  const lookX = CAMERA_LOOKAT[fp].x;
  const lookY = CAMERA_LOOKAT[fp].y;
  const lookZ = CAMERA_LOOKAT[fp].z;

  const prevLookX = CAMERA_LOOKAT[prevFocalPoint || fp].x;
  const prevLookY = CAMERA_LOOKAT[prevFocalPoint || fp].y;
  const prevLookZ = CAMERA_LOOKAT[prevFocalPoint || fp].z;

  return {
    from: {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      fov: camera.fov,
      lX: prevLookX,
      lY: prevLookY,
      lZ: prevLookZ
    },
    x: CAMERA_POSITIONS[fp].x,
    y: CAMERA_POSITIONS[fp].y,
    z: CAMERA_POSITIONS[fp].z,
    fov: CAMERA_FOV[fp],
    lX: lookX,
    lY: lookY,
    lZ: lookZ,
    config: SPRING_CONFIG
  };
};

const CameraControls = ({
  debug,
  focalPoint = "door",
  offsetX = 0,
  offsetY = 0,
  offsetZ = 0,
  onFreeForm,
  prevFocalPoint,
  shouldAnimate,
  wide = false
}: CameraControlsType) => {
  const {
    camera,
    gl: { domElement }
  }: {
    camera: THREE.PerspectiveCamera & {
      position: THREE.Vector3;
    };
    gl: {
      domElement: Element;
    };
  } = useThree();

  const controls: {
    current?: {
      domElement: Element;
    };
  } = useRef();

  const freeForm: boolean = focalPoint === "freeform";

  const [animating, setAnimating] = useState(false);

  const fp: any = freeForm ? prevFocalPoint : focalPoint;

  useEffect(() => {
    if (shouldAnimate) {
      setAnimating(freeForm ? false : true);
    } else {
      // low-p mode
      if (!freeForm)
        camera.position.set(
          CAMERA_POSITIONS[fp].x,
          CAMERA_POSITIONS[fp].y,
          CAMERA_POSITIONS[fp].z
        );
    }
  }, [focalPoint]);

  CAMERA_POSITIONS.door = new Vector3(
    DOOR_POSITIONS.normal.x + offsetX,
    wide ? DOOR_POSITIONS.wide.y : DOOR_POSITIONS.normal.y,
    wide ? DOOR_POSITIONS.wide.z : DOOR_POSITIONS.normal.z
  );
  CAMERA_POSITIONS.glass = new Vector3(
    GLASS_POSITIONS.normal.x + offsetX,
    GLASS_POSITIONS.normal.y + offsetY,
    GLASS_POSITIONS.normal.z + offsetZ
  );
  CAMERA_POSITIONS.handle = new Vector3(
    (wide ? HANDLE_POSITIONS.wide.x : HANDLE_POSITIONS.normal.x) + offsetX,
    HANDLE_POSITIONS.normal.y + offsetY,
    HANDLE_POSITIONS.normal.z + offsetZ
  );
  // CAMERA_POSITIONS.trim = wide === true ? new Vector3(0 + offsetX, 2.35 + offsetY, 7.5 + offsetZ) : CAMERA_POSITIONS.door
  // CAMERA_POSITIONS.trim = new Vector3(0, 1.86, 6.7)

  const lookatOffsetX = offsetX / 2;
  const lookatOffsetY = offsetY / 2;
  const lookatOffsetZ = offsetZ / 2;
  // while these can be different, I have found it's best to keep
  // them the same most of the time
  CAMERA_LOOKAT.door = new Vector3(
    0 + lookatOffsetX,
    (wide ? 2.0 : 0) + lookatOffsetY,
    0 + lookatOffsetZ
  );
  CAMERA_LOOKAT.glass = new Vector3(
    0 + lookatOffsetX,
    0 + lookatOffsetY,
    0 + lookatOffsetZ
  );
  CAMERA_LOOKAT.handle = new Vector3(
    (wide ? -0.1 : 0.8) + lookatOffsetX,
    0.2 + lookatOffsetY,
    0 + lookatOffsetZ
  );
  // CAMERA_LOOKAT.trim = wide === true ? new Vector3(0 + lookatOffsetX, 2 + lookatOffsetY, 0 + lookatOffsetZ) : CAMERA_LOOKAT.door
  // CAMERA_LOOKAT.trim = new Vector3(0 + lookatOffsetX, 1.6 + lookatOffsetY, 0 + lookatOffsetZ)

  // console.log('trim')
  // console.dir(CAMERA_LOOKAT.trim)
  // console.log('door')
  // console.dir(CAMERA_POSITIONS.trim)

  if (fp) {
    // Camera position animations - lowp devices skip these!
    if (shouldAnimate) {
      const { x, y, z, fov, lX, lY, lZ } = useSpring({
        ...setSpringAnimation({ camera, fp, prevFocalPoint }),
        reset: animating,
        onStart: () => setAnimating(true),
        onRest: () => setAnimating(false)
      });

      useFrame(() => {
        const lookAtVector = new Vector3(lX.get(), lY.get(), lZ.get());
        camera.lookAt(lookAtVector);
        CAMERA_LOOKAT.freeform = lookAtVector;
        if (animating) {
          camera.fov = fov.get();
          camera.position.set(x.get(), y.get(), z.get());
          camera.updateProjectionMatrix();
        }
      });
    }
    // else {
    //   useFrame(() => {
    //     camera.lookAt(new Vector3(CAMERA_LOOKAT[fp].x, CAMERA_LOOKAT[fp].y, CAMERA_LOOKAT[fp].z))
    //     camera.fov = CAMERA_FOV[fp]
    //     camera.updateProjectionMatrix()
    //   })
    // }

    const isCameraPositionManual = (): boolean => {
      let cameraPositionManual = false;

      const watchedAxes: AxesType[] = ["x", "y", "z"];
      watchedAxes.forEach((a: AxesType) => {
        if (camera.position[a] !== CAMERA_POSITIONS[fp][a])
          cameraPositionManual = true;
      });

      return cameraPositionManual;
    };

    if (controls.current) {
      // track whether camera rotation has been changed by the user
      const handlePointerUp = ({ target }: any) => {
        if (target.tagName !== "CANVAS") return false;

        if (isCameraPositionManual()) {
          CAMERA_POSITIONS["freeform"] = camera.position;
          CAMERA_FOV["freeform"] = camera.fov;
          CAMERA_LOOKAT["freeform"] = CAMERA_LOOKAT[fp];
        }
      };

      const handlePointerDown = ({ target }: any) => {
        if (target.tagName !== "CANVAS") return false;
        onFreeForm(camera.position.x);
      };

      controls.current.domElement.ownerDocument.removeEventListener(
        "pointerup",
        handlePointerUp,
        true
      );
      controls.current.domElement.ownerDocument.addEventListener(
        "pointerup",
        handlePointerUp,
        true
      );
      controls.current.domElement.ownerDocument.removeEventListener(
        "pointerdown",
        handlePointerDown,
        true
      );
      controls.current.domElement.ownerDocument.addEventListener(
        "pointerdown",
        handlePointerDown,
        true
      );
    }
  }

  const args = [camera, domElement];

  let orbitProps:
    | (OrbitControlsProps & {
        camera: THREE.PerspectiveCamera;
        domElement: Element;
      })
    | any = {
    args
  };

  if (!debug) {
    orbitProps = {
      ...orbitProps,
      // enablePan: false,
      enableZoom: true,
      // minDistance: 1.2,
      // maxDistance: 10,
      minPolarAngle: -Math.PI / 1.6,
      maxPolarAngle: Math.PI / 1.6
    };
  }

  return <orbitControls ref={controls} {...orbitProps} />;
};

export default CameraControls;
