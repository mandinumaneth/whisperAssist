import { Clock, MessageSquare, Lightbulb, Trash2 } from "lucide-react";

// Add onDelete prop to HistoryItem
const HistoryItem = ({ recommendation, onClick, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatProcessingTime = (ms) => {
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow border border-gray-200 relative group">
      {/* Delete button (top right) */}
      {onDelete && (
        <button
          className="absolute top-2 right-2 p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors z-10"
          title="Delete"
          onClick={(e) => {
            e.stopPropagation();
            if (
              window.confirm(
                "Are you sure you want to delete this history item ?"
              )
            ) {
              onDelete(recommendation._id);
            }
          }}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      <div onClick={onClick} className="space-y-3 cursor-pointer">
        {/* Transcription */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-gray-500 uppercase">
              Message
            </span>
          </div>
          <p className="text-sm text-gray-700">
            {truncateText(recommendation.transcription)}
          </p>
        </div>

        {/* Recommendation */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-medium text-gray-500 uppercase">
              Recommendation
            </span>
          </div>
          <p className="text-sm text-gray-700">
            {truncateText(recommendation.recommendation)}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex justify-end items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>{formatDate(recommendation.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

const HistoryList = ({ history, onItemClick, onDelete }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">No history found.</div>
    );
  }
  return (
    <div className="space-y-4">
      {history.map((item) => (
        <HistoryItem
          key={item._id}
          recommendation={item}
          onClick={() => onItemClick(item)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
export default HistoryList;
