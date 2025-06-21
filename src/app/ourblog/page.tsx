"use client";

import AdminLayout from "@/components/AdminLayout";
import ArticleCard from "@/components/ArticleCard";
import SearchBar from "@/components/SearchBar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getPostsByUserId, deletePost } from "@/services/postService";
import { Post } from "@/types/post";
import PostModal from "@/components/PostModal";
import DeletePostModal from "@/components/DeletePostModal";
import { useUserIdOrRedirect } from "@/utils/useUserIdOrRedirect";

export default function Posts() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Community");
  const [articles, setArticles] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [postID, setPostId] = useState<number>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const userId = useUserIdOrRedirect();

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.content.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "Community" || article.community_type === category;

      return matchesSearch && matchesCategory;
    });
  }, [articles, search, category]);

  const handleCratePost = () => {
    setShowModal(true);
  };

  const handleViewDetail = (id: number) => {
    router.push(`/posts/${id}`);
  };

  const handleFetchData = useCallback(async () => {
    try {
      if (!userId) return;
      const posts = await getPostsByUserId(userId);
      setArticles(posts);
    } catch (error) {
      alert(error);
    }
  }, [userId]);

  const handleEditPost = (id: number) => {
    setPostId(id);
    setShowModal(true);
  };

  const handleDeletePost = async (id: number) => {
    setPostId(id);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    handleFetchData();
  };

  const OnDeletePost = async () => {
    try {
      if (postID) {
        await deletePost(postID).then(() => {
          alert("Delete success");
          handleFetchData();
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <AdminLayout>
      <div className="w-full flex flex-col items-center">
        <SearchBar
          onCategoryChange={(value) => {
            setCategory(value);
          }}
          onCreate={handleCratePost}
          onSearchChange={(value) => {
            setSearch(value);
          }}
        />
        <div className="w-full px-6 pb-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, idx) => (
              <ArticleCard
                key={idx}
                id={article.id}
                user={article.userPostby || "Unknown"}
                category={article.community_type}
                title={article.title}
                excerpt={article.content.slice(0, 100)}
                comments={article.comments?.length || 0}
                onViewDetail={handleViewDetail}
                owner
                onDelete={handleDeletePost}
                onEdit={handleEditPost}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No articles found.</p>
          )}
        </div>
        {showModal && <PostModal id={postID} onClose={handleCloseModal} />}
        {showDeleteModal && (
          <DeletePostModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => {
              OnDeletePost();
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}
