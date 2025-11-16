import { useState, useRef, useCallback } from "react";

const AUDIO_MIME_TYPES = {
  preferred: "audio/webm;codecs=opus",
  fallback: "audio/webm",
} as const;

const CHUNK_INTERVAL_MS = 100;

type UseAudioRecordingOptions = {
  onText: (text: string) => void;
  onError?: (error: Error) => void;
};

type UseAudioRecordingReturn = {
  isRecording: boolean;
  isTranscribing: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  cleanup: () => void;
  getAnalyser: () => AnalyserNode | null;
};

/**
 * Hook for managing audio recording with MediaRecorder and transcription
 * @param onText - Callback when transcription is complete
 * @param onError - Optional error handler
 * @returns Recording state and control functions
 */
export function useAudioRecording({
  onText,
  onError,
}: UseAudioRecordingOptions): UseAudioRecordingReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const getSupportedMimeType = useCallback(() => {
    return MediaRecorder.isTypeSupported(AUDIO_MIME_TYPES.preferred)
      ? AUDIO_MIME_TYPES.preferred
      : AUDIO_MIME_TYPES.fallback;
  }, []);

  const cleanup = useCallback(() => {
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
      analyserRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    mediaRecorderRef.current = null;
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
        const err =
          error instanceof Error
            ? error
            : new Error("Error al transcribir el audio. Intenta nuevamente.");
        console.error("Error transcribing audio:", err);
        onError?.(err);
      } finally {
        setIsTranscribing(false);
      }
    },
    [onText, onError]
  );

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.3;
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
        cleanup();
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start(CHUNK_INTERVAL_MS);
      setIsRecording(true);
    } catch (error) {
      cleanup();
      const err =
        error instanceof Error
          ? error
          : new Error("No se pudo acceder al micrófono. Verifica los permisos.");
      console.error("Error accessing microphone:", err);
      onError?.(err);
    }
  }, [getSupportedMimeType, cleanup, transcribeAudio, onError]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  const getAnalyser = useCallback(() => analyserRef.current, []);

  return {
    isRecording,
    isTranscribing,
    startRecording,
    stopRecording,
    cleanup,
    getAnalyser,
  };
}

