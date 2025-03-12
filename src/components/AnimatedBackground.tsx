import { useEffect, useRef } from "react";
import * as THREE from "three";
const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    const createParticleSystem = (count: number, size: number, speed: number, depth: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 12;
        positions[i] = Math.cos(angle) * radius;
        positions[i + 1] = Math.sin(angle) * radius;
        positions[i + 2] = (Math.random() - 0.5) * depth;
        velocities[i] = (Math.random() - 0.5) * speed;
        velocities[i + 1] = (Math.random() - 0.5) * speed;
        velocities[i + 2] = (Math.random() - 0.5) * speed;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          size: { value: size },
          opacity: { value: 1.0 }
        },
        vertexShader: `
          attribute vec3 velocity;
          uniform float time;
          uniform float size;
          varying float vDistance;
          void main() {
            vec3 pos = position + velocity * time;
            pos.x = mod(pos.x + 12.0, 24.0) - 12.0;
            pos.y = mod(pos.y + 12.0, 24.0) - 12.0;
            pos.z = mod(pos.z + 12.0, 24.0) - 12.0;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            vDistance = length(mvPosition.xyz);
            gl_PointSize = size * (24.0 / vDistance);
          }
        `,
        fragmentShader: `
          uniform float opacity;
          varying float vDistance;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float glow = 1.0 - dist * 2.0;
            glow = pow(glow, 3.0);
            vec3 color = mix(
              vec3(0.545, 0.361, 0.965),
              vec3(0.645, 0.461, 1.000),
              glow
            );
            float finalOpacity = opacity * glow * (1.0 - vDistance / 24.0);
            gl_FragColor = vec4(color, finalOpacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      return new THREE.Points(geometry, material);
    };
    const particleSystems = [
      createParticleSystem(1500, 3.0, 0.001, 10),
      createParticleSystem(1000, 4.0, 0.002, 5)
    ];
    particleSystems.forEach(system => scene.add(system));
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      targetX += (mouseX * 0.5 - targetX) * 0.02;
      targetY += (mouseY * 0.5 - targetY) * 0.02;
      camera.position.x += (targetX * 3 - camera.position.x) * 0.01;
      camera.position.y += (targetY * 3 - camera.position.y) * 0.01;
      camera.lookAt(scene.position);
      particleSystems.forEach((system, index) => {
        system.rotation.y += delta * (0.1 + index * 0.05);
        system.rotation.x += delta * (0.05 + index * 0.03);
        (system.material as THREE.ShaderMaterial).uniforms.time.value = time;
        (system.material as THREE.ShaderMaterial).uniforms.opacity.value = 0.7 + Math.sin(time * (1 + index * 0.2)) * 0.3;
      });
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);
  return <>
    <div className="fixed top-0 left-0 w-full h-full bg-black" />
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full" />
    <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/20 to-black opacity-60" />
  </>;
};
export default AnimatedBackground;