// 🎬 CINEMATIC SECTION (FINAL PERFECT VERSION)
function SectionMotion({
  children,
  character,
  direction = "left",
  big = false,
}: {
  children: React.ReactNode;
  character?: string;
  direction?: "left" | "right";
  big?: boolean;
}) {
  const isLeft = direction === "left";

  return (
    <div className="relative w-full overflow-hidden py-16">

      {/* ================= CONTENT ================= */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -220 : 220 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-120px" }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* ================= CHARACTER ================= */}
      {character && (
        <motion.img
          src={character}
          alt="character"

          // 🔥 appear AFTER content
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}

          transition={{
            delay: 0.8,
            duration: 1.2,
            ease: "easeOut",
          }}

          // 🔥 CINEMATIC FLOAT (REAL FIX)
          animate={{
            y: [0, -30, 15, -20, 0],
            x: [0, 20, -15, 10, 0],
            rotate: [0, 3, -3, 2, 0],
            scale: [1, 1.03, 0.98, 1.02, 1],
          }}

          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          className={`
            absolute
            ${isLeft ? "right-0" : "left-0"}
            bottom-0

            ${big
              ? "w-[95vw] md:w-[70vw] lg:w-[55vw]"
              : "w-[80vw] md:w-[55vw] lg:w-[40vw]"}

            max-w-[900px]
            pointer-events-none
            z-20
          `}
        />
      )}
    </div>
  );
}