'use client';

import { useState } from 'react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
  isLiked: boolean;
}

interface TipCommentsProps {
  tipId: string;
  initialComments?: Comment[];
}

export default function TipComments({ tipId, initialComments = [] }: TipCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Current User',
      avatar: '/default-avatar.png',
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
      isLiked: false,
    };

    setComments([comment, ...comments]);
    setNewComment('');

    // TODO: Send to backend
    // await fetch(`/api/tips/${tipId}/comments`, {
    //   method: 'POST',
    //   body: JSON.stringify({ content: newComment })
    // });
  };

  const handleAddReply = async (parentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: 'Current User',
      avatar: '/default-avatar.png',
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
      isLiked: false,
    };

    setComments(comments.map(comment => 
      comment.id === parentId
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));

    setReplyContent('');
    setReplyingTo(null);

    // TODO: Send to backend
  };

  const handleLike = async (commentId: string, isReply: boolean = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map(comment =>
        comment.id === parentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? { ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1, isLiked: !reply.isLiked }
                  : reply
              ),
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1, isLiked: !comment.isLiked }
          : comment
      ));
    }

    // TODO: Send to backend
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Delete this comment?')) return;
    
    setComments(comments.filter(c => c.id !== commentId));
    // TODO: Send to backend
  };

  const CommentItem = ({ comment, isReply = false, parentId }: { comment: Comment; isReply?: boolean; parentId?: string }) => (
    <div className={`${isReply ? 'ml-12 mt-3' : 'mb-4'} border-b pb-4`}>
      <div className="flex gap-3">
        <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">{comment.author}</span>
            <span className="text-sm text-gray-500">{new Date(comment.timestamp).toLocaleDateString()}</span>
          </div>
          <p className="text-gray-800 mb-2">{comment.content}</p>
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => handleLike(comment.id, isReply, parentId)}
              className={`flex items-center gap-1 ${comment.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
            >
              <span>{comment.isLiked ? '❤️' : '🤍'}</span>
              <span>{comment.likes}</span>
            </button>
            {!isReply && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="text-gray-500 hover:text-blue-500"
              >
                Reply
              </button>
            )}
            <button
              onClick={() => handleDelete(comment.id)}
              className="text-gray-500 hover:text-red-500"
            >
              Delete
            </button>
          </div>

          {replyingTo === comment.id && (
            <div className="mt-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full px-3 py-2 border rounded-lg resize-none"
                rows={2}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleAddReply(comment.id)}
                  className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reply
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent('');
                  }}
                  className="px-4 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {comment.replies.length > 0 && (
            <div className="mt-3">
              {comment.replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} isReply parentId={comment.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Comments ({comments.reduce((acc, c) => acc + 1 + c.replies.length, 0)})
      </h2>

      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full px-4 py-3 border rounded-lg resize-none"
          rows={3}
        />
        <button
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Post Comment
        </button>
      </div>

      <div>
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
