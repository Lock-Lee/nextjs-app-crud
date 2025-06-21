import api from "@/lib/api";

export interface CreateCommentInput {
  postId: number;
  content: string;
}

export const createComment = async (data: CreateCommentInput) => {
  const res = await api.post("/comments", data);
  return res.data;
};

export const getCommentsByPost = async (postId: number) => {
  const res = await api.get(`/comments/post/${postId}`);
  return res.data;
};

export const updateComment = async (id: number, content: string) => {
  const userId = localStorage.getItem("user_id");
  if (!userId) throw new Error("user_id is not set in localStorage");

  const res = await api.patch(`/comments/${id}`, { content });
  return res.data;
};

export const deleteComment = async (id: number) => {
  await api.delete(`/comments/${id}`);
};
