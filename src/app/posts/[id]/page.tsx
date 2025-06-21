"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostById } from "@/services/postService";
import { createComment } from "@/services/commentService";

import { Post } from "@/types/post";
import Image from "next/image";
import AdminLayout from "@/components/AdminLayout";
import dayjs from "dayjs";
import { useUserIdOrRedirect } from "@/utils/useUserIdOrRedirect";
import IconBackWard from "@/components/Icons/IconBackWard";
import { MessageCircle } from "lucide-react";
export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const userId = useUserIdOrRedirect();

  const handleSubmit = useCallback(async () => {
    if (!post?.id || !userId) return;

    try {
      await createComment({ postId: post.id, content: comment });
      const updatedPost = await getPostById(post.id);
      setPost(updatedPost);
      setComment("");
      setShowForm(false);
    } catch {
      alert("Failed to post comment");
    }
  }, [post?.id, userId, comment]);

  useEffect(() => {
    if (id) {
      getPostById(Number(id)).then(setPost);
    }
  }, [id]);
  if (!post) return <div className="p-4">Loading...</div>;

  return (
    <AdminLayout>
      <div className="p-10 text-black">
        <a
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 cursor-pointer"
          onClick={() => window.history.back()}
        >
          <IconBackWard />
        </a>
        <div className="flex items-center mb-4 gap-3">
          <Image
            src="/avatar.png"
            alt="avatar"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div>
            <p className="font-semibold">
              {post.userPostby || "User"}{" "}
              <span className=" text-sm text-gray-500">
                {dayjs(post.createdAt).format("HH:mm")}
              </span>
            </p>

            <p
              style={{ color: "#898989" }}
              className="inline-block px-2 py-1 text-xs font-medium text-black bg-[#f3f3f3] rounded-full border border-gray-300"
            >
              {post.community_type}
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
        <p className="text-gray-800 mb-4">{post.content}</p>
        <div className="mt-6 mb-6 text-sm text-gray-500 flex gap-1 items-center">
          <MessageCircle className="w-4 h-4" />
          {post.comments?.length || 0} Comments
        </div>
        {!showForm && (
          <button
            className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
            onClick={() => setShowForm(true)}
          >
            Add Comments
          </button>
        )}

        {showForm && (
          <div className="mt-4 space-y-2">
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              rows={3}
              placeholder="What's on your mind..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-1 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Post
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-4">
          {post.comments?.map((comment, idx) => (
            <div key={"comments-" + idx} className="flex gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="bg-gray-100 p-3 rounded-lg flex-1">
                <p className="font-medium text-sm"> {comment.userCommentby}</p>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
