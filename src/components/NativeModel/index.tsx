import { useGLTF } from "@react-three/drei";

const NativeModel = ({ url }: { url: string }) => {
  const { scene }: any = useGLTF(url);
  return <primitive object={scene} />;
};

export default NativeModel;
