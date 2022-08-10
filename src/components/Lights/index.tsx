import { useRef } from "react";
import { Color, AmbientLight, SpotLightHelper } from "three";
import { useHelper, SpotLight } from "@react-three/drei";
import { extend } from "@react-three/fiber";

extend({ AmbientLight, SpotLight });

type LightsType = {
  debug?: boolean;
  castShadow: boolean;
  intensity: number;
};

const FrontLights = ({
  castShadow = true,
  debug = false,
  intensity
}: LightsType) => {
  return (
    <spotLight
      castShadow={castShadow}
      // decay={10}
      distance={500}
      position={[0, 5, 40]}
      power={intensity}
    />
  );
};

const RearLights = ({ castShadow = true, intensity }: LightsType) => (
  <spotLight
    castShadow={castShadow}
    distance={500}
    position={[0, 5, -40]}
    power={intensity}
  />
);

const Lights = (props: LightsType & { debug?: boolean }) => {
  const { debug, intensity, castShadow } = props;

  const ringIntensity = castShadow ? intensity * 2 : intensity * 1.2;

  return (
    <group>
      <hemisphereLight
        color={new Color("#ffffff")}
        intensity={intensity / 10}
      />
      {/* <FrontLights
        debug={debug}
        intensity={ringIntensity}
        castShadow={castShadow}
      />
      <RearLights
        debug={debug}
        intensity={ringIntensity}
        castShadow={castShadow}
      /> */}
    </group>
  );
};

export default Lights;
