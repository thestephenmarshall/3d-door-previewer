import { Vector3 } from "three";

export type AxesType = "x" | "y" | "z";

export type CameraControlsType = {
  shouldAnimate?: boolean;
  offsetX?: number;
  offsetY?: number;
  offsetZ?: number;
  debug?: boolean;
  focalPoint?: string;
  prevFocalPoint: string | null | undefined;
  onFreeForm: (x: number) => void;
  wide?: boolean;
};

export type DoorWidth = "normal" | "wide" | "leftWide" | "rightWide";

export type Selection = {
  id: string;
  type: string;
  name: string;
};

export type MeshSelection = {
  position: Vector3;
  url: string;
  scale?: number;
  materialSide?: "front" | "both";
  nativeMaterials?: boolean;
} & Selection;

export type TextureSelection = Selection & {
  url: string;
  rotation?: number;
};

export type ColorSelection = Selection & {
  emissive?: string;
  roughness?: number;
  reflectivity?: number;
  metalness?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  value: string;
};

export type Descriptor = MeshSelection | TextureSelection | ColorSelection;

export type ProductSelection = MeshSelection &
  ColorSelection &
  TextureSelection;
