import { Canvas } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

// Reads the --accent CSS variable and updates when the theme class on <html> changes
function useAccentColor() {
  const read = () => {
    const [r, g, b] = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()
      .split(/\s+/)
      .map(Number);
    return `rgb(${r}, ${g}, ${b})`;
  };
  const [color, setColor] = useState(read);

  useEffect(() => {
    const observer = new MutationObserver(() => setColor(read()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return color;
}

// Animated mesh component that creates fluid motion and reacts to mouse
function AnimatedMesh() {
  const meshRef = useRef<Mesh>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotation = useRef(new Vector3(0, 0, 0));
  const accent = useAccentColor();
  const aspect = useThree((state) => state.viewport.aspect);
  // Push the ring to the right on wide screens so it frames the content instead of sitting behind it
  const offsetX = aspect > 1.2 ? 2.4 : 0;

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current = { x, y };
      targetRotation.current.x = y * 0.2;
      targetRotation.current.y = x * 0.2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    
    timeRef.current += delta;
    const time = timeRef.current;
    
    // Smoothly interpolate to target rotation (mouse-influenced)
    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.05;
    
    // Add continuous fluid motion on top of mouse movement
    meshRef.current.rotation.x += Math.sin(time * 0.5) * 0.001;
    meshRef.current.rotation.y += Math.cos(time * 0.3) * 0.001;
    meshRef.current.rotation.z = Math.sin(time * 0.4) * 0.05;
    
    // Subtle position animation
    meshRef.current.position.x = offsetX + Math.sin(time * 0.2) * 0.3;
    meshRef.current.position.y = Math.cos(time * 0.25) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2, 0.5, 16, 100]} />
      <meshBasicMaterial color={accent} wireframe transparent opacity={0.14} />
    </mesh>
  );
}

// Three.js background component - renders WebGL scene behind all content
function Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <AnimatedMesh />
      </Canvas>
    </div>
  );
}

export default Background;

