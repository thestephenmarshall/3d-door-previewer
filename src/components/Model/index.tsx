import { RepeatWrapping, FrontSide, DoubleSide } from "three";
import {
  MeshPhysicalMaterialProps,
  MeshStandardMaterialProps,
  useLoader
} from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const MATERIAL_SIDES: { [key: string]: any } = {
  front: FrontSide,
  both: DoubleSide
};

const Model = ({
  color,
  texture = require("../../textures/blank.png"),
  url,
  roughness = 1,
  textureRotation,
  clearcoat,
  materialSide = "both",
  metalness = 0,
  shadows
}: {
  color?: string;
  url: string;
  roughness: number;
  texture: string;
  textureRotation: number;
  clearcoat: number;
  materialSide: string;
  metalness: number;
  shadows: boolean;
}) => {
  const { nodes }: any = useGLTF(url);

  const nodeKeys = Object.keys(nodes);

  const { geometry } = nodes[nodeKeys[0]];

  const meshProps: any = {};

  const bumpMap = useLoader(TextureLoader, texture).clone();
  bumpMap.wrapS = RepeatWrapping;
  bumpMap.wrapT = RepeatWrapping;
  bumpMap.rotation = textureRotation;

  let material: MeshStandardMaterialProps & MeshPhysicalMaterialProps = {
    bumpMap,
    bumpScale: 0.003,
    color,
    roughness,
    side: MATERIAL_SIDES[materialSide],
    metalness
    // specularIntensity: 0.8,
    // reflectivity: 0.1
  };

  if (clearcoat) {
    material.clearcoat = clearcoat;
  }

  if (shadows) {
    meshProps.receiveShadow = true;
    meshProps.castShadow = true;
  }

  return (
    <mesh geometry={geometry} {...meshProps}>
      {clearcoat && <meshPhysicalMaterial {...material} />}
      {!clearcoat && <meshStandardMaterial {...material} />}
    </mesh>
  );
};

export default Model;
