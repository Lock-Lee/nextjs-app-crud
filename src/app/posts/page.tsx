"use client";

import AdminLayout from "@/components/AdminLayout";
import ArticleCard from "@/components/ArticleCard";
import SearchBar from "@/components/SearchBar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllPosts } from "@/services/postService";
import { Post } from "@/types/post";
import PostModal from "@/components/PostModal";

export default function Posts() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Community");
  const [articles, setArticles] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const handleCloseModal = () => {
    setShowModal(false);
    handleFetchData();
  };

  const handleFetchData = useCallback(async () => {
    try {
      const posts = await getAllPosts();
      setArticles(posts);
    } catch (error) {
      alert(error);
    }
  }, []);

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
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No articles found.</p>
          )}
        </div>
        {showModal && <PostModal onClose={handleCloseModal} />}
      </div>
    </AdminLayout>
  );
}
