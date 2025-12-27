import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const MysticParticles = () => {
  const violetParticlesRef = useRef<THREE.Points>(null);
  const goldenSparklesRef = useRef<THREE.Points>(null);

  // Create violet/silver swirling particles
  const violetParticles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Initial positions in a cylinder around the deck
      const radius = 3 + Math.random() * 5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 12;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Circular velocities
      velocities[i * 3] = Math.sin(angle) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = Math.cos(angle) * 0.01;

      // Purple to silver gradient
      const colorMix = Math.random();
      const color = new THREE.Color();
      if (colorMix > 0.5) {
        color.setHex(0x8b5cf6); // Violet
      } else {
        color.setHex(0xc0c0c0); // Silver
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.05 + 0.02;
    }

    return { positions, velocities, colors, sizes };
  }, []);

  // Create golden sparkles that rise upward
  const goldenSparkles = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Random positions near the deck
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = -6 + Math.random() * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      // Upward velocities with slight random drift
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = 0.02 + Math.random() * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      sizes[i] = Math.random() * 0.08 + 0.03;
    }

    return { positions, velocities, sizes };
  }, []);

  // Animate particles
  useFrame(() => {
    if (violetParticlesRef.current) {
      const positions = violetParticlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length / 3; i++) {
        // Swirl motion
        const angle = Math.atan2(positions[i * 3 + 2], positions[i * 3]);
        const radius = Math.sqrt(
          positions[i * 3] ** 2 + positions[i * 3 + 2] ** 2
        );

        const newAngle = angle + 0.005;
        positions[i * 3] = Math.cos(newAngle) * radius;
        positions[i * 3 + 2] = Math.sin(newAngle) * radius;

        // Slow vertical drift
        positions[i * 3 + 1] += violetParticles.velocities[i * 3 + 1];

        // Reset if too high or low
        if (positions[i * 3 + 1] > 6) positions[i * 3 + 1] = -6;
        if (positions[i * 3 + 1] < -6) positions[i * 3 + 1] = 6;
      }

      violetParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (goldenSparklesRef.current) {
      const positions = goldenSparklesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length / 3; i++) {
        // Rise upward
        positions[i * 3] += goldenSparkles.velocities[i * 3];
        positions[i * 3 + 1] += goldenSparkles.velocities[i * 3 + 1];
        positions[i * 3 + 2] += goldenSparkles.velocities[i * 3 + 2];

        // Reset to bottom when reaching top
        if (positions[i * 3 + 1] > 8) {
          positions[i * 3] = (Math.random() - 0.5) * 8;
          positions[i * 3 + 1] = -6;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
      }

      goldenSparklesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Violet/Silver swirling particles */}
      <points ref={violetParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={violetParticles.positions.length / 3}
            array={violetParticles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={violetParticles.colors.length / 3}
            array={violetParticles.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={violetParticles.sizes.length}
            array={violetParticles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Golden sparkles rising upward */}
      <points ref={goldenSparklesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={goldenSparkles.positions.length / 3}
            array={goldenSparkles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={goldenSparkles.sizes.length}
            array={goldenSparkles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#fbbf24"
          transparent
          opacity={0.7}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};
