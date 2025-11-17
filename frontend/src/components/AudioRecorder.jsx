import { useState, useRef } from "react";
import { Mic, Square, Loader2, Pause, Play, X } from "lucide-react";

const AudioRecorder = ({ onRecordingComplete, isProcessing }) => {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // Only call onRecordingComplete if not cancelled
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          const audioFile = new File([audioBlob], "recording.webm", {
            type: "audio/webm",
          });
          onRecordingComplete(audioFile);
        }
        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setIsPaused(false);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error(error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  // Cancel recording: stop and discard audio, reset all state, do NOT trigger onRecordingComplete
  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      // Stop all tracks
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      // Remove event handlers to prevent onstop from firing
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.ondataavailable = null;
      mediaRecorderRef.current = null;
    }
    audioChunksRef.current = [];
    setIsRecording(false);
    setIsPaused(false);
    clearInterval(timerRef.current);
    setRecordingTime(0);
  };

  // Pause or resume recording
  const togglePause = () => {
    if (!mediaRecorderRef.current) return;
    if (isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(timerRef.current);
    }
  };
  // ...existing code...

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* RECORD BUTTON + ANIMATION */}
      <div className="relative flex items-center justify-center">
        {isRecording && !isProcessing && (
          <span
            className={`absolute w-28 h-28 rounded-full border-4 border-red-400 pointer-events-none ${
              !isPaused ? "animate-spin-slow" : ""
            }`}
            style={{
              borderTopColor: "transparent",
              borderRightColor: "transparent",
            }}
          />
        )}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`
            relative w-24 h-24 rounded-full flex items-center justify-center
            transition-all duration-300 shadow-lg
            ${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }
            ${isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {isProcessing ? (
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          ) : isRecording ? (
            <Square className="w-10 h-10 text-white" />
          ) : (
            <Mic className="w-10 h-10 text-white" />
          )}
        </button>
      </div>
      {/* PAUSE AND CANCEL BUTTONS (SEPARATE SECTION) */}
      {isRecording && !isProcessing && (
        <div className="flex gap-4">
          <button
            onClick={togglePause}
            className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition-colors font-medium"
          >
            {isPaused ? (
              <Play className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={cancelRecording}
            className="flex items-center gap-1 px-4 py-2 border border-red-300 rounded-lg text-red-600 bg-white hover:bg-red-50 transition-colors font-medium"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      )}
      {/* TIMER + STATUS */}
      <div className="text-center">
        {isRecording && (
          <div className="space-y-2">
            <p className="text-2xl font-mono font-bold text-red-500">
              {formatTime(recordingTime)}
            </p>
            <p className="text-sm text-gray-600">
              {isPaused ? "Paused" : "Recording..."}
            </p>
          </div>
        )}
        {!isRecording && !isProcessing && (
          <p className="text-gray-600">Click to start recording</p>
        )}
        {isProcessing && (
          <p className="text-blue-600 font-medium">
            Processing your request...
          </p>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
