import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Capsule({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} position={position}>
        <capsuleGeometry args={[0.5, 1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-background overflow-hidden">
      <div className="absolute inset-0 noise-bg" />
      {/* Gradient Meshes */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[120px]" />
      
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        
        {/* Buyer Capsule */}
        <Capsule position={[-3, 1, -2]} color="#3B82F6" speed={0.8} />
        {/* Seller Capsule */}
        <Capsule position={[3, -1, -3]} color="#10B981" speed={1.2} />
        {/* Admin Capsule */}
        <Capsule position={[0, 2, -4]} color="#8B5CF6" speed={0.5} />
      </Canvas>
    </div>
  );
}
