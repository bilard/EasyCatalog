import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TarotCard as TarotCardData } from '../../tarotCards';

interface TarotCardProps {
  card: TarotCardData;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  showFront?: boolean;
  glowIntensity?: number;
  onClick?: () => void;
}

export const TarotCard = ({
  card,
  position,
  rotation,
  scale = 1,
  showFront = false,
  glowIntensity = 0.3,
  onClick
}: TarotCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Create card textures (using Canvas2D for text rendering)
  const textures = useMemo(() => {
    const cardWidth = 512;
    const cardHeight = 768;

    // Front face
    const frontCanvas = document.createElement('canvas');
    frontCanvas.width = cardWidth;
    frontCanvas.height = cardHeight;
    const frontCtx = frontCanvas.getContext('2d')!;

    // Parchment-like gradient background
    const gradient = frontCtx.createLinearGradient(0, 0, 0, cardHeight);
    gradient.addColorStop(0, '#f5e6d3');
    gradient.addColorStop(1, '#d4c5b0');
    frontCtx.fillStyle = gradient;
    frontCtx.fillRect(0, 0, cardWidth, cardHeight);

    // Gold foil border
    frontCtx.strokeStyle = '#d4af37';
    frontCtx.lineWidth = 8;
    frontCtx.strokeRect(20, 20, cardWidth - 40, cardHeight - 40);

    // Inner decorative border
    frontCtx.strokeStyle = '#8b7355';
    frontCtx.lineWidth = 2;
    frontCtx.strokeRect(30, 30, cardWidth - 60, cardHeight - 60);

    // Card name
    frontCtx.fillStyle = '#2d1b00';
    frontCtx.font = 'bold 48px serif';
    frontCtx.textAlign = 'center';
    frontCtx.fillText(card.name, cardWidth / 2, 100);

    // Roman numeral
    const romanNumerals = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                          'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
    frontCtx.font = '36px serif';
    frontCtx.fillStyle = '#8b7355';
    frontCtx.fillText(romanNumerals[card.id], cardWidth / 2, 150);

    // Central mystic symbol (simplified)
    frontCtx.beginPath();
    frontCtx.arc(cardWidth / 2, cardHeight / 2, 80, 0, Math.PI * 2);
    frontCtx.strokeStyle = '#6b46c1';
    frontCtx.lineWidth = 3;
    frontCtx.stroke();

    // Inner circle
    frontCtx.beginPath();
    frontCtx.arc(cardWidth / 2, cardHeight / 2, 60, 0, Math.PI * 2);
    frontCtx.stroke();

    // Keywords
    frontCtx.font = '20px serif';
    frontCtx.fillStyle = '#2d1b00';
    const keywords = card.keywords.join(' • ');
    const maxWidth = cardWidth - 80;
    const words = keywords.split(' ');
    let line = '';
    let y = cardHeight - 150;

    words.forEach(word => {
      const testLine = line + word + ' ';
      const metrics = frontCtx.measureText(testLine);
      if (metrics.width > maxWidth && line !== '') {
        frontCtx.fillText(line, cardWidth / 2, y);
        line = word + ' ';
        y += 25;
      } else {
        line = testLine;
      }
    });
    frontCtx.fillText(line, cardWidth / 2, y);

    const frontTexture = new THREE.CanvasTexture(frontCanvas);

    // Back face - celestial motif
    const backCanvas = document.createElement('canvas');
    backCanvas.width = cardWidth;
    backCanvas.height = cardHeight;
    const backCtx = backCanvas.getContext('2d')!;

    // Deep purple background
    backCtx.fillStyle = '#1e1b4b';
    backCtx.fillRect(0, 0, cardWidth, cardHeight);

    // Gold border
    backCtx.strokeStyle = '#d4af37';
    backCtx.lineWidth = 8;
    backCtx.strokeRect(20, 20, cardWidth - 40, cardHeight - 40);

    // Central celestial design
    backCtx.save();
    backCtx.translate(cardWidth / 2, cardHeight / 2);

    // Sun/Moon combination
    backCtx.fillStyle = '#fbbf24';
    backCtx.beginPath();
    backCtx.arc(-30, 0, 50, 0, Math.PI * 2);
    backCtx.fill();

    backCtx.fillStyle = '#c0c0c0';
    backCtx.beginPath();
    backCtx.arc(30, 0, 50, 0, Math.PI * 2);
    backCtx.fill();

    // Stars
    backCtx.fillStyle = '#ffffff';
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x = Math.cos(angle) * 120;
      const y = Math.sin(angle) * 120;

      backCtx.beginPath();
      for (let j = 0; j < 5; j++) {
        const starAngle = (j / 5) * Math.PI * 2 - Math.PI / 2;
        const radius = j % 2 === 0 ? 8 : 4;
        const sx = x + Math.cos(starAngle) * radius;
        const sy = y + Math.sin(starAngle) * radius;
        if (j === 0) backCtx.moveTo(sx, sy);
        else backCtx.lineTo(sx, sy);
      }
      backCtx.closePath();
      backCtx.fill();
    }

    backCtx.restore();

    const backTexture = new THREE.CanvasTexture(backCanvas);

    return { front: frontTexture, back: backTexture };
  }, [card]);

  // Gentle floating animation
  useFrame((state) => {
    if (meshRef.current && !showFront) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + card.id) * 0.05;
    }

    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + card.id) * 0.1 + glowIntensity;
      glowRef.current.material.opacity = pulse;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Ethereal glow */}
      <mesh ref={glowRef} position={[0, 0, -0.02]}>
        <planeGeometry args={[0.75, 1.15]} />
        <meshBasicMaterial
          color={showFront ? "#fbbf24" : "#6b46c1"}
          transparent
          opacity={glowIntensity}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Card mesh */}
      <mesh ref={meshRef} onClick={onClick}>
        <boxGeometry args={[0.7, 1.1, 0.01]} />
        <meshStandardMaterial
          map={showFront ? textures.front : textures.back}
          roughness={0.3}
          metalness={0.2}
          emissive={showFront ? "#fbbf24" : "#6b46c1"}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Edge glow */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.7, 1.1, 0.01)]} />
        <lineBasicMaterial
          color={showFront ? "#fbbf24" : "#8b5cf6"}
          transparent
          opacity={0.5}
          linewidth={2}
        />
      </lineSegments>
    </group>
  );
};
