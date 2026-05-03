"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SpaceScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();

    // ================= CAMERA (RESPONSIVE) =================
    const scale = isMobile ? 40 : 28;

    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -scale,
      window.innerWidth / scale,
      window.innerHeight / scale,
      window.innerHeight / -scale,
      0.1,
      1000
    );

    camera.position.z = 100;

    // ================= RENDERER =================
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 🔥 important for mobile performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mountRef.current?.appendChild(renderer.domElement);

    // ================= STARS (RESPONSIVE COUNT) =================
    const starGeo = new THREE.BufferGeometry();
    const starCount = isMobile ? 2500 : 7000;

    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 400;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        size: isMobile ? 1.6 : 1.3,
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
      })
    );

    scene.add(stars);

    // ================= GLOW =================
    const glowTexture = (color: string) => {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d")!;
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );

      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.15, color);
      gradient.addColorStop(0.3, color);
      gradient.addColorStop(0.5, "rgba(255,255,255,0.05)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      return new THREE.CanvasTexture(canvas);
    };

    const createPlanet = (
      orbit: number,
      size: number,
      speed: number,
      color: string
    ) => {
      const material = new THREE.SpriteMaterial({
        map: glowTexture(color),
        transparent: true,
        blending: THREE.AdditiveBlending,
      });

      const sprite = new THREE.Sprite(material);

      // 🔥 scale adjust for mobile
      const scaleFactor = isMobile ? 0.7 : 1;
      sprite.scale.set(size * scaleFactor, size * scaleFactor, 1);

      scene.add(sprite);

      return {
        sprite,
        orbit: orbit * (isMobile ? 0.75 : 1),
        speed,
        angle: Math.random() * Math.PI * 2,
      };
    };

    // ================= CENTER =================
    const center = createPlanet(0, 10, 0, "#00f7ff");

    // ================= RINGS =================
    const rings = [10, 14, 18, 22, 26, 30, 34, 38];

    rings.forEach((r, i) => {
      const geo = new THREE.RingGeometry(r - 0.1, r + 0.1, 256);

      const mat = new THREE.MeshBasicMaterial({
        color: 0x00f7ff,
        transparent: true,
        opacity: 0.2 - i * 0.02,
        side: THREE.DoubleSide,
      });

      const ring = new THREE.Mesh(geo, mat);

      ring.rotation.x = 0.75;
      ring.scale.y = 0.55;

      // 🔥 shrink rings on mobile
      const s = isMobile ? 0.8 : 1;
      ring.scale.multiplyScalar(s);

      scene.add(ring);
    });

    // ================= PLANETS =================
    const planets = [
      createPlanet(8.5, 5.5, 0.004, "#ff00aa"),
      createPlanet(12.5, 6, 0.0035, "#00ffff"),
      createPlanet(16.5, 6.5, 0.003, "#ffaa00"),
      createPlanet(20.5, 6, 0.0028, "#ffffff"),
      createPlanet(24.5, 6.2, 0.0025, "#00ff88"),
      createPlanet(28.5, 8.5, 0.0022, "#ff8800"),
      createPlanet(32, 8, 0.0022, "#cccccc"),
    ];

    // ================= SATELLITES =================
    const satellites = [
      createPlanet(28, 2, 0.015, "#ffffff"),
      createPlanet(28, 2, 0.015, "#00f7ff"),
      createPlanet(28, 2, 0.015, "#ff00aa"),
      createPlanet(28, 2, 0.015, "#ffaa00"),
    ];

    satellites.forEach((s, i) => {
      s.angle = (Math.PI * 2 * i) / satellites.length;
    });

    // ================= PARALLAX =================
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      if (isMobile) return; // 🚫 disable heavy parallax on mobile

      mouseX = (e.clientX / window.innerWidth - 0.5) * 6;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 6;
    });

    // ================= RESIZE FIX =================
    const handleResize = () => {
      const scale = window.innerWidth < 768 ? 40 : 28;

      camera.left = window.innerWidth / -scale;
      camera.right = window.innerWidth / scale;
      camera.top = window.innerHeight / scale;
      camera.bottom = window.innerHeight / -scale;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // ================= ANIMATION =================
    const animate = () => {
      requestAnimationFrame(animate);

      planets.forEach((p) => {
        p.angle += p.speed;
        p.sprite.position.x = Math.cos(p.angle) * p.orbit;
        p.sprite.position.y = Math.sin(p.angle) * p.orbit * 0.55;
      });

      satellites.forEach((s) => {
        s.angle += s.speed;
        s.sprite.position.x = Math.cos(s.angle) * s.orbit;
        s.sprite.position.y = Math.sin(s.angle) * s.orbit * 0.55;
      });

      scene.position.x += (mouseX - scene.position.x) * 0.02;
      scene.position.y += (-mouseY - scene.position.y) * 0.02;

      stars.rotation.z += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="fixed inset-0 z-0" ref={mountRef} />;
}