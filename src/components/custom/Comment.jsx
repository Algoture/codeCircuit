import clsx from "clsx";
import { ThumbsUp, Trash2 } from "lucide-react";
import { DeleteIcon } from "../ui/delete";

export default function Comment({
  comment,
  onLike,
  onDelete,
  onReplySubmit,
  activeReplyId,
  setActiveReplyId,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      onReplySubmit(comment.id, e.target.value.trim());
      setActiveReplyId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md">
        <img
          src={comment.avatar}
          alt={comment.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">{comment.name}</span>
            <div className="flex gap-3 text-muted-foreground">
              <button onClick={() => onLike(comment.id)}>
                <ThumbsUp
                  className={clsx(
                    "w-4 h-4",
                    comment.liked && "fill-blue-500 text-blue-500"
                  )}
                />
              </button>
              <button onClick={() => onDelete(comment.id)}>
                <DeleteIcon className="w-4 h-4" />
              </button>
              {!comment.isReply && (
                <button
                  className="cursor-pointer"
                  onClick={() => setActiveReplyId(comment.id)}>
                  Reply
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-1">{comment.text}</p>

          {activeReplyId === comment.id && (
            <div className="mt-2 flex items-center gap-2">
              <input
                autoFocus
                type="text"
                placeholder="Write a reply..."
                className="w-full px-3 py-1 border-[1.5px] border-muted-foreground rounded-md text-sm focus:outline-none "
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={() => setActiveReplyId(null)}
                className="rounded text-sm px-3 text-white py-1 cursor-pointer bg-muted-foreground">
                Cancel
              </button>
            </div>
          )}

          {comment.replies?.length > 0 && (
            <div className="mt-4 space-y-3 pl-6 border-l-2 border-gray-200">
              {comment.replies.map((r) => (
                <div
                  key={r.id}
                  className="flex items-start gap-2 bg-gray-50 p-2 rounded">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">{r.name}</span>
                      <div className="flex gap-2 text-gray-400">
                        <button onClick={() => onLike(comment.id, r.id)}>
                          <ThumbsUp
                            className={clsx(
                              "w-4 h-4",
                              r.liked && "fill-blue-500 text-blue-fill-blue-500"
                            )}
                          />
                        </button>
                        <button onClick={() => onDelete(comment.id, r.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
