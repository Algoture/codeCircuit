import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Heart, MessageSquare, Bookmark, BadgeCheck, Send } from "lucide-react";
import clsx from "clsx";
import Comment from "./Comment";
import { Textarea } from "../ui/textarea";
import { MessageSquareIcon } from "../ui/message-square";

const transition = { type: "spring", bounce: 0, duration: 0.4 };
export default function Post() {
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Ravi",
      text: "Just Brilliant!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      liked: false,
      replies: [],
    },
    {
      id: 2,
      name: "Gian",
      text: "Take my money",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      liked: false,
      replies: [],
    },
  ]);

  const handleAddComment = () => {
    if (commentInput.trim() === "") return;
    const newComment = {
      id: Date.now(),
      name: "You",
      text: commentInput,
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      liked: false,
      replies: [],
    };
    setComments((prev) => [...prev, newComment]);
    setCommentInput("");
  };

  const handleLike = (commentId, replyId = null) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? replyId
            ? {
                ...c,
                replies: c.replies.map((r) =>
                  r.id === replyId ? { ...r, liked: !r.liked } : r
                ),
              }
            : { ...c, liked: !c.liked }
          : c
      )
    );
  };

  const handleDelete = (commentId, replyId = null) => {
    setComments((prev) =>
      prev
        .map((c) =>
          c.id === commentId
            ? replyId
              ? {
                  ...c,
                  replies: c.replies.filter((r) => r.id !== replyId),
                }
              : null
            : c
        )
        .filter(Boolean)
    );
  };

  const handleReplySubmit = (commentId, text) => {
    const reply = {
      id: Date.now(),
      name: "You",
      text,
      avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
      liked: false,
    };
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [...c.replies, reply],
            }
          : c
      )
    );
  };

  return (
    <MotionConfig transition={transition}>
      <section className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-500 flex items-center justify-center p-4">
        <motion.div
          layout
          className="max-w-md w-full bg-white p-3 rounded-3xl shadow-lg overflow-hidden">
          {/* Profile */}
          <motion.div layout className="flex items-center gap-2 mb-2">
            <img
              src="https://avatars.githubusercontent.com/u/93142776?v=4"
              alt="User profile"
              className="size-8 rounded-full object-cover"
            />
            <div className="cen gap-.5">
              <h2 className="text-sm font-semibold text-gray-800">
                Umesh Nagare
              </h2>
              <BadgeCheck className="size-5 mt-1 fill-yellow-500 text-white" />
            </div>
          </motion.div>

          {/* Img */}
          <motion.div layout className="w-full mb-2">
            <img
              src="https://cdn.dribbble.com/userupload/16865619/file/original-80d0710ea86124e4a68415bccf44c357.png"
              alt="Post"
              className="w-full rounded-2xl object-cover aspect-square"
            />
          </motion.div>

          {/* Btns */}
          <motion.div layout className="flex justify-between items-center px-1">
            <div className="flex items-center space-x-2">
              <button onClick={() => setLike(!like)}>
                <Heart
                  className={clsx(
                    "cursor-pointer hover:scale-110 transition-all",
                    like && "fill-red-500 text-red-500"
                  )}
                />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => setShowComments(!showComments)}>
                <MessageSquareIcon />
              </button>
              <button>
                <Send className="hover:rotate-45 cursor-pointer transition-all" />
              </button>
            </div>
            <button onClick={() => setBookmark(!bookmark)}>
              <Bookmark
                className={clsx(bookmark && "fill-blue-500 text-blue-500")}
              />
            </button>
          </motion.div>

          <AnimatePresence>
            {showComments && (
              <motion.div
                layout
                key="comments"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                transition={transition}
                className="px-1">
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}>
                      <Comment
                        comment={comment}
                        onLike={handleLike}
                        onDelete={handleDelete}
                        onReplySubmit={handleReplySubmit}
                        activeReplyId={activeReplyId}
                        setActiveReplyId={setActiveReplyId}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="gap-1 flex mt-2">
                  <Textarea
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                    placeholder="Add a comment..."
                  />

                  <div className="flex flex-col justify-between">
                    <button
                      onClick={handleAddComment}
                      className="rounded-md w-full justify-items-end text-sm px-3 text-white py-1 cursor-pointer bg-primary">
                      Post
                    </button>
                    <button
                      onClick={() => setShowComments(false)}
                      className="rounded-md w-full justify-items-end text-sm px-3 text-white py-1 cursor-pointer bg-muted-foreground">
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
