import ReactMarkdown from "react-markdown";
import {
  MessageSquare,
  Lightbulb,
  Clock,
  Calendar,
  Trash2,
} from "lucide-react";

const RecommendationDisplay = ({
  transcription,
  recommendation,
  processingTime,
  createdAt,
  id,
  onDelete,
}) => {
  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Transcription Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 relative">
        {/* Delete button top right */}
        {id && onDelete && (
          <button
            className="absolute top-4 right-4 p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors z-10"
            title="Delete"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this message and its recommendation ?"
                )
              ) {
                onDelete(id);
              }
            }}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Your Message</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{transcription}</p>
      </div>

      {/* Recommendation Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">AI Recommendation</h3>
        </div>
        <div className="prose prose-blue max-w-none">
          <ReactMarkdown>{recommendation}</ReactMarkdown>
        </div>
      </div>

      {/* Metadata */}
      {createdAt && (
        <div className="flex justify-end items-center text-sm text-gray-500 px-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationDisplay;
