"use client";

import { useEffect, useState } from "react";

export default function SectionBackground() {

  const [section, setSection] = useState(0);

  useEffect(() => {

    const sections = document.querySelectorAll("[data-bg]");

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-bg"));
            setSection(index);
          }

        });

      },
      { threshold: 0.6 }
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();

  }, []);

  return (

    <div className="fixed inset-0 -z-0 pointer-events-none">

      <img
        src="/parallax/ai-guide-1.png"
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-[1200ms] ease-in-out ${
          section === 1 ? "opacity-30" : "opacity-0"
        }`}
      />

      <img
        src="/parallax/ai-guide-2.png"
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-[1200ms] ease-in-out ${
          section === 2 ? "opacity-30" : "opacity-0"
        }`}
      />

      <img
        src="/parallax/ai-guide-3.png"
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-[1200ms] ease-in-out ${
          section === 3 ? "opacity-30" : "opacity-0"
        }`}
      />

    </div>

  );

}