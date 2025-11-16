"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, Square, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface AudioInputProps {
  onText: (text: string) => void;
  disabled?: boolean;
}

const AUDIO_MIME_TYPES = {
  preferred: "audio/webm;codecs=opus",
  fallback: "audio/webm",
} as const;

const CHUNK_INTERVAL_MS = 100;
const MIN_SCALE = 1;
const MAX_SCALE = 1.15;
const SMOOTHING_FACTOR = 0.3;

export function AudioInput({ onText, disabled }: AudioInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const getSupportedMimeType = useCallback(() => {
    return MediaRecorder.isTypeSupported(AUDIO_MIME_TYPES.preferred)
      ? AUDIO_MIME_TYPES.preferred
      : AUDIO_MIME_TYPES.fallback;
  }, []);

  const cleanupStream = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
      analyserRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setAudioLevel(0);
  }, []);

  const transcribeAudio = useCallback(
    async (audioBlob: Blob) => {
      setIsTranscribing(true);
      try {
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.webm");

        const response = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Error en la transcripción");
        }

        const data = await response.json();
        if (!data.text) {
          throw new Error("No se recibió texto transcrito");
        }

        onText(data.text);
      } catch (error) {
        console.error("Error transcribing audio:", error);
        alert(
          error instanceof Error
            ? error.message
            : "Error al transcribir el audio. Intenta nuevamente."
        );
      } finally {
        setIsTranscribing(false);
      }
    },
    [onText]
  );

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = SMOOTHING_FACTOR;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const mimeType = getSupportedMimeType();
      const chunks: Blob[] = [];
      const mediaRecorder = new MediaRecorder(stream, { mimeType });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: mimeType });
        cleanupStream();
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start(CHUNK_INTERVAL_MS);
      setIsRecording(true);
    } catch (error) {
      cleanupStream();
      console.error("Error accessing microphone:", error);
      alert("No se pudo acceder al micrófono. Verifica los permisos.");
    }
  }, [getSupportedMimeType, cleanupStream, transcribeAudio]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  useEffect(() => {
    if (!isRecording || !analyserRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateAudioLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      const average =
        dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      const normalizedLevel = Math.min(average / 128, 1);
      setAudioLevel(normalizedLevel);

      if (isRecording) {
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      }
    };

    updateAudioLevel();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording]);

  const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * audioLevel;
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
