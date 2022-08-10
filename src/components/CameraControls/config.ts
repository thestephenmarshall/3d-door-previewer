export const SPRING_CONFIG: { [key: string]: number } = {
  mass: 1,
  tension: 210,
  friction: 20,
  velocity: 0,
  duration: 500
};

export const CAMERA_FOV: { [key: string]: number } = {
  door: 35,
  glass: 35,
  handle: 35,
  trim: 40
};

export const DOOR_POSITIONS: {
  normal: { x: number; y: number; z: number };
  wide: { x: number; y: number; z: number };
} = {
  normal: {
    x: 0,
    y: 0,
    z: 9.65
  },
  wide: {
    x: 0,
    y: 0,
    z: 0
  }
};

export const GLASS_POSITIONS: {
  normal: { x: number; y: number; z: number };
  wide: { x: number; y: number; z: number };
} = {
  normal: {
    x: 0,
    y: 0,
    z: 6
  },
  wide: {
    x: 0,
    y: 0,
    z: 7.1
  }
};

export const HANDLE_POSITIONS: {
  normal: { x: number; y: number; z: number };
  wide: { x: number; y: number; z: number };
} = {
  normal: {
    x: 0,
    y: 0,
    z: 2.3
  },
  wide: {
    x: 0,
    y: 0,
    z: 2.3
  }
};
