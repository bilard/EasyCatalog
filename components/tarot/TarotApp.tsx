import React, { useState, useEffect } from 'react';
import { TarotScene } from './TarotScene';

export const TarotApp = () => {
  const [cameraPermission, setCameraPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    // Check camera permission
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setCameraPermission('granted'))
      .catch(() => setCameraPermission('denied'));
  }, []);

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <TarotScene />
      </div>

      {/* Title Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
          Mystic Tarot Reading
        </h1>
        <p className="text-center text-slate-300 mt-2 text-sm md:text-base">
          Use hand gestures to explore the ancient wisdom
        </p>
      </div>

      {/* Instructions Panel */}
      {showInstructions && (
        <div className="absolute top-24 right-6 bg-slate-900/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 max-w-md z-20 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
              <span className="text-2xl">✋</span>
              Gesture Controls
            </h2>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Close instructions"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-xl">
                👈
              </div>
              <div>
                <div className="font-semibold text-purple-200">Swipe Left</div>
                <div className="text-slate-400">Open palm, move left to unfurl the deck into a wheel</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-xl">
                ✊
              </div>
              <div>
                <div className="font-semibold text-purple-200">Fist Gesture</div>
                <div className="text-slate-400">Close your hand to select the nearest card</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-xl">
                🖐️
              </div>
              <div>
                <div className="font-semibold text-purple-200">Open Hand</div>
                <div className="text-slate-400">Open palm after selection to return to the deck</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-xl">
                🔄
              </div>
              <div>
                <div className="font-semibold text-purple-200">Rotate Wheel</div>
                <div className="text-slate-400">Move your hand left/right to browse cards in wheel mode</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-purple-500/20">
            <p className="text-xs text-slate-400 italic">
              The cards are shuffled each session for an authentic reading experience.
            </p>
          </div>
        </div>
      )}

      {/* Camera Permission Warning */}
      {cameraPermission === 'denied' && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-900/90 backdrop-blur-sm border border-red-500/50 rounded-lg p-4 max-w-md z-20 shadow-2xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-red-200 mb-1">Camera Access Required</h3>
              <p className="text-sm text-red-100">
                Please enable camera access in your browser settings to use hand gesture controls.
              </p>
            </div>
          </div>
        </div>
      )}

      {cameraPermission === 'pending' && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-purple-900/90 backdrop-blur-sm border border-purple-500/50 rounded-lg p-4 max-w-md z-20 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-300"></div>
            <p className="text-sm text-purple-100">
              Requesting camera access for hand tracking...
            </p>
          </div>
        </div>
      )}

      {/* Toggle Instructions Button */}
      {!showInstructions && (
        <button
          onClick={() => setShowInstructions(true)}
          className="absolute top-24 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110 z-20"
          aria-label="Show instructions"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}

      {/* Mystical Border Decoration */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-purple-500/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-purple-500/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-purple-500/30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-purple-500/30"></div>
      </div>
    </div>
  );
};
