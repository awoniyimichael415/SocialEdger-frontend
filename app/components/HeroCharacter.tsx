"use client";

import { useEffect, useState } from "react";

export default function HeroCharacter() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timer);

  }, []);

  return (

    <div className="relative w-full flex justify-center items-center">

      {/* Glow Background */}
      <div className="absolute w-[350px] h-[350px] bg-purple-600/30 blur-[120px] rounded-full animate-pulse"></div>

      <img
        src="/hero-character.png"
        alt="SocialEdger AI Guide"
        className={`relative z-10 w-[320px] md:w-[420px]
        transition-opacity duration-1000
        ${visible ? "opacity-100" : "opacity-0"}
        animate-characterFloat`}
      />

      <style jsx>{`

        @keyframes characterFloat {

          0% {
            transform: translateY(0px) rotateY(0deg);
          }

          50% {
            transform: translateY(-12px) rotateY(8deg);
          }

          100% {
            transform: translateY(0px) rotateY(0deg);
          }

        }

        .animate-characterFloat {
          animation: characterFloat 6s ease-in-out infinite;
        }

      `}</style>

    </div>

  );
}