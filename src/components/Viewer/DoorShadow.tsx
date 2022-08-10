import { FrontSide, MathUtils, TextureLoader, Vector3 } from "three";

type DoorShadowWidth = "normal" | "wide" | "leftWide" | "rightWide";

type DoorShadowType = {
  width?: DoorShadowWidth;
};

const SHADOW_PATH = require("./door-dropshadow.png");

const DOOR_SHADOW_WIDTHS: { [key: string]: number[] } = {
  normal: [3, 2.2],
  wide: [5.4, 2.2],
  leftWide: [4.3, 2.2],
  rightWide: [4.3, 2.2]
};

const DOOR_SHADOW_POSITIONS: { [key: string]: number[] } = {
  normal: [0, -2, 0],
  wide: [0, -2, 0],
  leftWide: [-0.4, -2, 0],
  rightWide: [0.4, -2, 0]
};

const DoorShadow = ({ width = "normal" }: DoorShadowType) => {
  const doorShadowTexture = new TextureLoader().load(SHADOW_PATH);
  const [x, y, z] = DOOR_SHADOW_POSITIONS[width];
  return (
    <group>
      <mesh
        position={new Vector3(x, y, z)}
        rotation={[MathUtils.degToRad(-90), 0, 0]}
        receiveShadow
      >
        <planeBufferGeometry
          args={DOOR_SHADOW_WIDTHS[width]}
          attach="geometry"
        />
        <meshStandardMaterial
          attach="material"
          map={doorShadowTexture}
          side={FrontSide}
          transparent
          opacity={0.88}
        />
      </mesh>
    </group>
  );
};

export default DoorShadow;
