"use client";

import { useEffect, useRef, useState } from "react";

export default function ExerciseCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  useEffect(() => {
    async function initCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera init error:", err);
      }
    }
    initCamera();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  const handleAnalyze = async () => {
    // Placeholder for AI analysis logic.
    // In a real implementation, you would capture a frame or stream,
    // send it to an AI service, and receive movement error feedback.
    setAnalysisResult("Analyzing... (this is a stub)");
    setTimeout(() => {
      setAnalysisResult(
        "No major errors detected. Great form! (stub result)"
      );
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-md rounded-lg border border-gray-300"
      />
      <button
        onClick={handleAnalyze}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Analyze Exercise
      </button>
      {analysisResult && (
        <p className="mt-2 text-center text-lg">{analysisResult}</p>
      )}
    </div>
  );
}
