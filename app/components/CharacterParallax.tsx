"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function CharacterParallax() {

  const { scrollYProgress } = useScroll();

  /*
  Timeline

  0 → 0.15 = Hero (no characters)

  0.15 → 0.35 = Character 1
  0.35 → 0.55 = Character 2
  0.55 → 0.75 = Character 3
  */

  const char1Opacity = useTransform(scrollYProgress,[0.15,0.22,0.32,0.35],[0,1,1,0]);
  const char2Opacity = useTransform(scrollYProgress,[0.35,0.42,0.52,0.55],[0,1,1,0]);
  const char3Opacity = useTransform(scrollYProgress,[0.55,0.62,0.72,0.75],[0,1,1,0]);

  const char1Y = useTransform(scrollYProgress,[0.15,0.35],[300,-200]);
  const char2Y = useTransform(scrollYProgress,[0.35,0.55],[300,-200]);
  const char3Y = useTransform(scrollYProgress,[0.55,0.75],[300,-200]);

  return (

    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">

      {/* CHARACTER 1 */}
      <motion.img
        src="/parallax/ai-guide-1.png"
        style={{
          opacity: char1Opacity,
          y: char1Y
        }}
        className="absolute w-[80vw] max-w-[1100px] object-contain"
      />

      {/* CHARACTER 2 */}
      <motion.img
        src="/parallax/ai-guide-2.png"
        style={{
          opacity: char2Opacity,
          y: char2Y
        }}
        className="absolute w-[80vw] max-w-[1100px] object-contain"
      />

      {/* CHARACTER 3 */}
      <motion.img
        src="/parallax/ai-guide-3.png"
        style={{
          opacity: char3Opacity,
          y: char3Y
        }}
        className="absolute w-[80vw] max-w-[1100px] object-contain"
      />

    </div>

  );

}