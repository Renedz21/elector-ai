"use client";

import { useCallback } from "react";
import { Mic, Square, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudioRecording } from "@/lib/hooks/use-audio-recording";
import { useAudioLevel } from "@/lib/hooks/use-audio-level";

interface AudioInputProps {
  onText: (text: string) => void;
  disabled?: boolean;
}

export function AudioInput({ onText, disabled }: AudioInputProps) {
  const handleError = useCallback(
    (error: Error) => {
      alert(error.message);
    },
    []
  );

  const {
    isRecording,
    isTranscribing,
    startRecording,
    stopRecording,
    getAnalyser,
  } = useAudioRecording({
    onText,
    onError: handleError,
  });

  const { scale } = useAudioLevel({
    analyser: getAnalyser(),
    isRecording,
  });

  const handleClick = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  const isDisabled = disabled || isTranscribing;

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      size="icon"
      variant={isRecording ? "destructive" : "outline"}
      className="rounded-full transition-transform duration-75 ease-out hover:cursor-pointer"
      style={{
        transform: isRecording ? `scale(${scale})` : "scale(1)",
      }}
      aria-label={isRecording ? "Detener grabación" : "Iniciar grabación"}
    >
      {isTranscribing ? (
        <Loader2 className="animate-spin" />
      ) : isRecording ? (
        <Square className="size-5" fill="#ffffff" />
      ) : (
        <Mic className="size-5" />
      )}
    </Button>
  );
}
