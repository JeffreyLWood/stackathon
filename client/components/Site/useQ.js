import { useRef, useMemo } from "react";
import { gsap } from "gsap";

export default function useQ() {
  const ref = useRef();
  const q = useMemo(() => gsap.utils.selector(ref), [ref]);
  return [q, ref];
}
