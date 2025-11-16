import { useState, useEffect } from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 1.15;

type UseAudioLevelOptions = {
  analyser: AnalyserNode | null;
  isRecording: boolean;
};

type UseAudioLevelReturn = {
  audioLevel: number;
  scale: number;
};

/**
 * Hook for tracking audio level with requestAnimationFrame
 * @param analyser - AnalyserNode from AudioContext
 * @param isRecording - Whether recording is active
 * @returns Normalized audio level (0-1) and scale value for UI
 */
export function useAudioLevel({
  analyser,
  isRecording,
}: UseAudioLevelOptions): UseAudioLevelReturn {
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    if (!isRecording || !analyser) {
      setAudioLevel(0);
      return;
    }

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let animationFrameId: number | null = null;

    const updateAudioLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      const average =
        dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      const normalizedLevel = Math.min(average / 128, 1);
      setAudioLevel(normalizedLevel);

      if (isRecording) {
        animationFrameId = requestAnimationFrame(updateAudioLevel);
      }
    };

    updateAudioLevel();

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [analyser, isRecording]);

  const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * audioLevel;

  return { audioLevel, scale };
}
