import { gsap } from "gsap";

const play1Timeline = (node, pathname) => {
  const timeline = new gsap.timeline({ paused: true });
  const els = node.querySelectorAll(".stagger");

  timeline.fromTo(
    els,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 2,
      stagger: 0.1,
      ease: "expo",
      y: -20,
      delay: 2,
    }
  );
  timeline.play();
};
const play2Timeline = (node, pathname) => {
  const timeline = new gsap.timeline({ paused: true });
  const els = node.querySelectorAll(".stagger");
  timeline.fromTo(
    els,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 2,
      stagger: 0.1,
      ease: "expo",
      y: -20,
      delay: 1,
    }
  );
  timeline.play();
};
export const play = (node, pathname, template) => {
  window.loadPromise.then(() => {
    if (!template || template === 1) {
      return play1Timeline(node, pathname);
    }
    if (template === 2) {
      return play2Timeline(node, pathname);
    }
  });
};
export const exit = (node, location) => {
  const timeline = new gsap.timeline({ paused: true });
  const els = node.querySelectorAll(".stagger");
  timeline.fromTo(
    els,
    { opacity: 1 },
    {
      opacity: 0,
      duration: 1,
      ease: "expo",
    }
  );
  timeline.play();
};
