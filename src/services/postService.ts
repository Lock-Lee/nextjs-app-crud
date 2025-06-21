import api from "@/lib/api";
import { Post } from "@/types/post";

export interface CreatePostInput {
  title: string;
  content: string;
  community_type: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  community_type?: string;
}

export const createPost = async (data: CreatePostInput) => {
  const res = await api.post("/posts", data);
  return res.data;
};

export const getAllPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const getPostById = async (id: number) => {
  const res = await api.get<Post>(`/posts/${id}`);
  return res.data;
};

export const updatePost = async (id: number, data: UpdatePostInput) => {
  const res = await api.patch(`/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id: number) => {
  await api.delete(`/posts/${id}`);
};

export const getPostsByUserId = async (userId: string): Promise<Post[]> => {
  const res = await api.get<Post[]>(`/posts/user/${userId}`);
  return res.data;
};
