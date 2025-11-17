import { useState, useEffect } from "react";
import { Bot, History, RefreshCw } from "lucide-react";
import AudioRecorder from "./components/AudioRecorder";
import RecommendationDisplay from "./components/RecommendationDisplay";
import HistoryList from "./components/HistoryList";
import api from "./services/api";
import Alert from "./components/Alert";
import LoadingSpinner from "./components/LoadingSpinner";
import { recommendationAPI } from "./services/api";
import "./App.css";

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const loadHistory = async () => {
    try {
      setIsLoadingHistory(true);
      const response = await recommendationAPI.getHistory();
      setHistory(response.data.data);
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleRecordingComplete = async (audioFile) => {
    setIsProcessing(true);
    setAlert(null);
    setCurrentResult(null);

    try {
      const response = await recommendationAPI.create(audioFile);

      if (response.data.success) {
        setCurrentResult(response.data.data);
        setAlert({
          type: "success",
          message: "Recommendation generated successfully!",
        });
        // Reload history
        loadHistory();
      }
    } catch (error) {
      console.error("Error processing audio:", error);
      setAlert({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to process audio. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleHistoryItemClick = (item) => {
    setCurrentResult(item);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewRecording = () => {
    setCurrentResult(null);
    setAlert(null);
    setShowHistory(false);
  };

  // Delete a recommendation by ID
  const handleDeleteHistory = async (id) => {
    try {
      await api.delete(`/recommendations/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
      setAlert({ type: "success", message: "History item deleted." });
    } catch (error) {
      setAlert({ type: "error", message: "Failed to delete history item." });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 md:px-10">
        <div className="container mx-auto py-6 px-2 sm:px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div>
                <h1 className="text-3xl font-bold text-blue-600">
                  Whisper Assistant
                </h1>
                <p className="text-sm text-gray-600">
                  AI Voice Recommendation System
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-center sm:justify-end flex-wrap">
              {currentResult && (
                <button
                  onClick={handleNewRecording}
                  className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  <RefreshCw className="w-4 h-4" />
                  New Recording
                </button>
              )}
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <History className="w-4 h-4" />
                {showHistory ? "Hide History" : "Show History"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Alert (top-right, floating) */}
      {alert && (
        <div className="fixed top-4 right-2 sm:top-6 sm:right-6 z-50 min-w-[220px] max-w-xs w-[90vw] sm:w-auto">
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-8 sm:py-12">
        {/* History View */}
        {showHistory ? (
          <div className="max-w-4xl mx-auto">
            {isLoadingHistory ? (
              <LoadingSpinner message="Loading history..." />
            ) : (
              <HistoryList
                history={history}
                onItemClick={handleHistoryItemClick}
                onDelete={handleDeleteHistory}
              />
            )}
          </div>
        ) : (
          <>
            {/* Current Result or Recorder */}
            {currentResult ? (
              <RecommendationDisplay
                id={currentResult.id || currentResult._id}
                transcription={currentResult.transcription}
                recommendation={currentResult.recommendation}
                processingTime={currentResult.processingTime}
                createdAt={currentResult.createdAt}
                onDelete={async (id) => {
                  try {
                    await recommendationAPI.delete(id);
                    setCurrentResult(null);
                    setShowHistory(true);
                    setAlert({ type: "success", message: "Message deleted." });
                    // Optionally reload history
                    loadHistory();
                  } catch {
                    setAlert({
                      type: "error",
                      message: "Failed to delete message.",
                    });
                  }
                }}
              />
            ) : (
              <div className="max-w-2xl mx-auto px-2">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-12 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Start Your Voice Request
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Click the microphone button and speak your request. Our AI
                    will transcribe your message and provide intelligent
                    recommendations.
                  </p>
                  <AudioRecorder
                    onRecordingComplete={handleRecordingComplete}
                    isProcessing={isProcessing}
                  />
                </div>

                {/* Instructions removed */}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer removed */}
    </div>
  );
}

export default App;
