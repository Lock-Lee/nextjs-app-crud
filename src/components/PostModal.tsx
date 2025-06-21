"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { createPost, getPostById, updatePost } from "@/services/postService";
import { useRouter } from "next/navigation";
import axios from "axios";

interface CreatePostModalProps {
  onClose: () => void;
  id?: number;
}

const communityOptions = [
  "History",
  "Food",
  "Pets",
  "Health",
  "Fashion",
  "Exercise",
  "Others",
];

const PostModal: FC<CreatePostModalProps> = ({ onClose, id }) => {
  const router = useRouter();

  const [community, setCommunity] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("Please log in first.");
      router.push("/login");
      return;
    }

    if (!title || !content || !community) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (id) {
        await updatePost(id, {
          title,
          content,
          community_type: community,
        }).then(() => {
          alert("Update success");
        });
      } else {
        await createPost({ title, content, community_type: community }).then(
          () => {
            alert("Create success");
          }
        );
      }
      onClose();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to create post.");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong.");
      }
    }
  };

  const handlePostsById = useCallback(async () => {
    try {
      if (!id) return;
      await getPostById(id).then((data) => {
        const { community_type, content, title } = data;
        setCommunity(community_type);
        setTitle(title);
        setContent(content);
      });
    } catch (error) {
      alert(error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      handlePostsById();
    }
  }, [id, handlePostsById]);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-black">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-black"
        ></button>
        <h2 className="text-xl font-bold mb-4">Create Post</h2>

        <select
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-3"
        >
          <option value="">Choose a community</option>
          {communityOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 rounded-md p-2 mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="What's on your mind..."
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-green-600 text-green-600 px-4 py-1 rounded-md hover:bg-green-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostModal;
