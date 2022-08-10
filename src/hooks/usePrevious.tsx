import { useEffect, useRef } from "react";

export const usePrevious = (value: string) => {
  const ref: { current: undefined | string } = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
