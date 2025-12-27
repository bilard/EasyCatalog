import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { MAJOR_ARCANA, shuffleDeck, TarotCard as TarotCardData } from '../../tarotCards';
import { CosmicBackground } from './CosmicBackground';
import { MysticParticles } from './MysticParticles';
import { TarotCard } from './TarotCard';
import { useHandGestures, GestureType } from '../../hooks/useHandGestures';

type DeckMode = 'stack' | 'wheel' | 'selected';

interface CardTransform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  showFront: boolean;
  glowIntensity: number;
}

const CardDeck = () => {
  const [deckMode, setDeckMode] = useState<DeckMode>('stack');
  const [shuffledCards, setShuffledCards] = useState<TarotCardData[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);

  const gestureData = useHandGestures(true);
  const previousGestureRef = useRef<GestureType>('none');

  // Initialize shuffled deck
  useEffect(() => {
    setShuffledCards(shuffleDeck([...MAJOR_ARCANA]));
  }, []);

  // Handle gestures
  useEffect(() => {
    const currentGesture = gestureData.gesture;
    const previousGesture = previousGestureRef.current;

    // Swipe left: Enter wheel mode
    if (currentGesture === 'swipe_left' && previousGesture !== 'swipe_left' && deckMode === 'stack') {
      setDeckMode('wheel');
      setTransitionProgress(0);
    }

    // Fist: Select card (only in wheel mode)
    if (currentGesture === 'fist' && previousGesture !== 'fist' && deckMode === 'wheel') {
      // Find nearest card based on hand position
      const angleStep = (Math.PI * 2) / shuffledCards.length;
      const currentAngle = wheelRotation % (Math.PI * 2);
      const nearestIndex = Math.round(currentAngle / angleStep) % shuffledCards.length;

      setSelectedCardIndex(nearestIndex);
      setDeckMode('selected');
      setTransitionProgress(0);
    }

    // Open hand: Reset to deck
    if (currentGesture === 'open_hand' && previousGesture !== 'open_hand' && deckMode === 'selected') {
      setDeckMode('stack');
      setSelectedCardIndex(null);
      setTransitionProgress(0);
    }

    previousGestureRef.current = currentGesture;
  }, [gestureData.gesture, deckMode, wheelRotation, shuffledCards.length]);

  // Update wheel rotation based on hand position
  useEffect(() => {
    if (deckMode === 'wheel' && gestureData.gesture !== 'none') {
      // Rotate wheel based on hand X position
      const rotationSpeed = gestureData.handPosition.x * 0.02;
      setWheelRotation(prev => prev + rotationSpeed);
    }
  }, [gestureData.handPosition.x, deckMode, gestureData.gesture]);

  // Animate transition progress
  useFrame((state, delta) => {
    if (transitionProgress < 1) {
      setTransitionProgress(prev => Math.min(prev + delta * 1.25, 1)); // 800ms transition
    }
  });

  // Calculate card transforms based on mode
  const cardTransforms = useMemo((): Map<number, CardTransform> => {
    const transforms = new Map<number, CardTransform>();

    // Easing function for smooth transitions
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const progress = easeOutCubic(transitionProgress);

    shuffledCards.forEach((card, index) => {
      let transform: CardTransform;

      if (deckMode === 'stack') {
        // Tight vertical stack
        const stackOffset = index * 0.002;
        transform = {
          position: [0, stackOffset, 0],
          rotation: [0, Math.PI * 2 * progress, 0], // Rotate during transition
          scale: 1,
          showFront: false,
          glowIntensity: 0.3
        };
      } else if (deckMode === 'wheel') {
        // Horizontal rotating ring
        const angleStep = (Math.PI * 2) / shuffledCards.length;
        const angle = angleStep * index + wheelRotation;
        const radius = 5;

        const targetX = Math.cos(angle) * radius;
        const targetZ = Math.sin(angle) * radius;

        // Interpolate from stack to wheel
        const x = THREE.MathUtils.lerp(0, targetX, progress);
        const z = THREE.MathUtils.lerp(0, targetZ, progress);
        const y = THREE.MathUtils.lerp(index * 0.002, 0, progress);

        transform = {
          position: [x, y, z],
          rotation: [0, angle + Math.PI / 2, 0],
          scale: 1,
          showFront: false,
          glowIntensity: 0.3
        };
      } else {
        // Selected mode
        if (index === selectedCardIndex) {
          // Selected card moves forward and expands
          transform = {
            position: [
              THREE.MathUtils.lerp(Math.cos(wheelRotation) * 5, 0, progress),
              THREE.MathUtils.lerp(0, 1, progress),
              THREE.MathUtils.lerp(Math.sin(wheelRotation) * 5, 3, progress)
            ],
            rotation: [0, THREE.MathUtils.lerp(wheelRotation + Math.PI / 2, 0, progress), 0],
            scale: THREE.MathUtils.lerp(1, 1.5, progress),
            showFront: progress > 0.5,
            glowIntensity: 0.8
          };
        } else {
          // Other cards fade and retreat
          const angleStep = (Math.PI * 2) / shuffledCards.length;
          const angle = angleStep * index + wheelRotation;
          const radius = 5;

          transform = {
            position: [
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius - 3 * progress
            ],
            rotation: [0, angle + Math.PI / 2, 0],
            scale: 1 - 0.5 * progress,
            showFront: false,
            glowIntensity: 0.3 * (1 - progress)
          };
        }
      }

      transforms.set(card.id, transform);
    });

    return transforms;
  }, [shuffledCards, deckMode, selectedCardIndex, wheelRotation, transitionProgress]);

  // Rotate the entire stack in stack mode
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current && deckMode === 'stack') {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  if (shuffledCards.length === 0) return null;

  return (
    <group ref={groupRef}>
      {shuffledCards.map((card, index) => {
        const transform = cardTransforms.get(card.id);
        if (!transform) return null;

        // Don't render cards that have faded out completely
        if (deckMode === 'selected' && index !== selectedCardIndex && transitionProgress > 0.8) {
          return null;
        }

        return (
          <TarotCard
            key={card.id}
            card={card}
            position={transform.position}
            rotation={transform.rotation}
            scale={transform.scale}
            showFront={transform.showFront}
            glowIntensity={transform.glowIntensity}
          />
        );
      })}
    </group>
  );
};

export const TarotScene = () => {
  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{ background: '#0a0a1a' }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-5, 0, -5]} intensity={0.3} color="#6b46c1" />
        <pointLight position={[5, 0, -5]} intensity={0.3} color="#8b5cf6" />

        {/* Scene components */}
        <CosmicBackground />
        <MysticParticles />
        <CardDeck />

        {/* Camera controls (subtle) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </>
  );
};
