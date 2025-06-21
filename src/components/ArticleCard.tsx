import { FC } from "react";
import { UserCircle2, MessageCircle } from "lucide-react";
import IconPencil from "./Icons/IconPencil";
import IconTrash from "./Icons/IconTrash";

interface ArticleCardProps {
  owner?: boolean;
  id: number;
  user: string;
  category: string;
  title: string;
  excerpt: string;
  comments: number;
  onViewDetail: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ArticleCard: FC<ArticleCardProps> = ({
  owner,
  id,
  user,
  category,
  title,
  excerpt,
  comments,
  onViewDetail,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md mb-4 text-black relative cursor-pointer"
      onClick={() => onViewDetail(id)}
    >
      {owner && (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <a
            className="text-sm text-blue-600 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(id);
            }}
          >
            <IconPencil />
          </a>
          <a
            className="text-sm text-red-600 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(id);
            }}
          >
            <IconTrash />
          </a>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2">
        <UserCircle2 className="w-6 h-6 text-gray-400" />
        <span className="font-medium">{user}</span>
      </div>
      <span
        style={{ color: "#898989" }}
        className="inline-block px-2 py-1 text-xs font-medium text-black bg-[#f3f3f3] rounded-full border border-gray-300"
      >
        {category}
      </span>

      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{excerpt}</p>
      <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
        <MessageCircle className="w-4 h-4" />
        {comments} Comments
      </div>
    </div>
  );
};

export default ArticleCard;
