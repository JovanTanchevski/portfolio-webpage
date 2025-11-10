import { Canvas } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

// Animated mesh component that creates fluid motion and reacts to mouse
function AnimatedMesh() {
  const meshRef = useRef<Mesh>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotation = useRef(new Vector3(0, 0, 0));

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

  useFrame((state, delta) => {
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
    meshRef.current.position.x = Math.sin(time * 0.2) * 0.3;
    meshRef.current.position.y = Math.cos(time * 0.25) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2, 0.5, 16, 100]} />
      <meshStandardMaterial 
        color="#1a1a1a" 
        wireframe 
        emissive="#0a0a0a"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Three.js background component - renders WebGL scene behind all content
function Background() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <AnimatedMesh />
      </Canvas>
    </div>
  );
}

export default Background;

