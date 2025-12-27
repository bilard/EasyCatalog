import { useEffect, useRef, useState } from 'react';
import { Hands, Results, NormalizedLandmark } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

export type GestureType = 'none' | 'swipe_left' | 'fist' | 'open_hand';

export interface HandGestureData {
  gesture: GestureType;
  handPosition: { x: number; y: number; z: number };
  palmCenter: { x: number; y: number };
}

const calculateDistance = (p1: NormalizedLandmark, p2: NormalizedLandmark): number => {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) +
    Math.pow(p1.y - p2.y, 2) +
    Math.pow(p1.z - p2.z, 2)
  );
};

const isFist = (landmarks: NormalizedLandmark[]): boolean => {
  // Check if fingertips are close to palm
  const palmBase = landmarks[0]; // Wrist
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  const palmCenter = landmarks[9]; // Middle finger MCP

  // Calculate distances from fingertips to palm
  const thumbDist = calculateDistance(thumbTip, palmCenter);
  const indexDist = calculateDistance(indexTip, palmCenter);
  const middleDist = calculateDistance(middleTip, palmCenter);
  const ringDist = calculateDistance(ringTip, palmCenter);
  const pinkyDist = calculateDistance(pinkyTip, palmCenter);

  // If most fingers are close to palm, it's a fist
  const closedFingers = [indexDist, middleDist, ringDist, pinkyDist].filter(d => d < 0.15).length;
  return closedFingers >= 3;
};

const isOpenHand = (landmarks: NormalizedLandmark[]): boolean => {
  // Check if all fingers are extended
  const palmCenter = landmarks[9];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  const indexDist = calculateDistance(indexTip, palmCenter);
  const middleDist = calculateDistance(middleTip, palmCenter);
  const ringDist = calculateDistance(ringTip, palmCenter);
  const pinkyDist = calculateDistance(pinkyTip, palmCenter);

  // If most fingers are far from palm, it's an open hand
  const extendedFingers = [indexDist, middleDist, ringDist, pinkyDist].filter(d => d > 0.2).length;
  return extendedFingers >= 3;
};

export const useHandGestures = (enabled: boolean = true) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const handsRef = useRef<Hands | null>(null);

  const [gestureData, setGestureData] = useState<HandGestureData>({
    gesture: 'none',
    handPosition: { x: 0, y: 0, z: 0 },
    palmCenter: { x: 0.5, y: 0.5 }
  });

  const previousPositionRef = useRef<{ x: number; y: number } | null>(null);
  const swipeDetectionTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const videoElement = document.createElement('video');
    videoElement.style.display = 'none';
    document.body.appendChild(videoElement);
    videoRef.current = videoElement;

    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    hands.onResults((results: Results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];

        // Palm center (middle finger MCP joint)
        const palmCenter = landmarks[9];

        // Calculate 3D hand position (approximate depth from hand size)
        const handSize = calculateDistance(landmarks[0], landmarks[9]);
        const depth = 1 - handSize * 2; // Larger hand = closer to camera

        const currentPosition = { x: palmCenter.x, y: palmCenter.y };

        // Detect gestures
        let detectedGesture: GestureType = 'none';

        if (isFist(landmarks)) {
          detectedGesture = 'fist';
        } else if (isOpenHand(landmarks)) {
          detectedGesture = 'open_hand';
        }

        // Detect swipe left
        const now = Date.now();
        if (previousPositionRef.current && now - swipeDetectionTimeRef.current > 500) {
          const deltaX = currentPosition.x - previousPositionRef.current.x;
          const deltaY = Math.abs(currentPosition.y - previousPositionRef.current.y);

          // Swipe left: significant horizontal movement to the left, minimal vertical
          if (deltaX < -0.15 && deltaY < 0.1 && isOpenHand(landmarks)) {
            detectedGesture = 'swipe_left';
            swipeDetectionTimeRef.current = now;
          }
        }

        previousPositionRef.current = currentPosition;

        setGestureData({
          gesture: detectedGesture,
          handPosition: {
            x: (palmCenter.x - 0.5) * 2, // Convert to -1 to 1 range
            y: -(palmCenter.y - 0.5) * 2, // Invert Y and convert to -1 to 1 range
            z: depth
          },
          palmCenter: {
            x: palmCenter.x,
            y: palmCenter.y
          }
        });
      } else {
        // No hand detected
        setGestureData({
          gesture: 'none',
          handPosition: { x: 0, y: 0, z: 0 },
          palmCenter: { x: 0.5, y: 0.5 }
        });
        previousPositionRef.current = null;
      }
    });

    handsRef.current = hands;

    // Start camera
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        if (handsRef.current && videoRef.current) {
          await handsRef.current.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480
    });

    camera.start();
    cameraRef.current = camera;

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (handsRef.current) {
        handsRef.current.close();
      }
      if (videoRef.current) {
        document.body.removeChild(videoRef.current);
      }
    };
  }, [enabled]);

  return gestureData;
};
