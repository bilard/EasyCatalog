import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CosmicBackground = () => {
  const starsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Mesh>(null);

  // Create starfield
  const stars = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);

    for (let i = 0; i < 2000; i++) {
      // Random positions in a large sphere
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Subtle color variations (white to light blue)
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.1, 0.2, 0.8 + Math.random() * 0.2);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  // Animate stars with subtle rotation
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.005;
    }

    // Pulsing nebula effect
    if (nebulaRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.9;
      nebulaRef.current.material.opacity = pulse * 0.15;
    }
  });

  return (
    <>
      {/* Starfield */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={stars.positions.length / 3}
            array={stars.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={stars.colors.length / 3}
            array={stars.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Nebula aura behind the deck */}
      <mesh ref={nebulaRef} position={[0, 0, -5]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial
          color="#6b46c1"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Aurora-like glow effects */}
      <mesh position={[-10, 5, -8]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[15, 3]} />
        <meshBasicMaterial
          color="#4c1d95"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[8, -3, -8]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[12, 4]} />
        <meshBasicMaterial
          color="#5b21b6"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ambient fog */}
      <fog attach="fog" args={['#0a0a1a', 20, 80]} />
    </>
  );
};
