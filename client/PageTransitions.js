import { gsap } from "gsap";
export const play = (node, pathname) => {
  window.loadPromise.then(() => {
    const timeline = new gsap.timeline({ paused: true });
    const els = node.querySelectorAll(".stagger");

    console.log(node);
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
