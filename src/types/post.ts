export interface Comment {
  id: number;
  userCommentby: string;
  postId: number;
  content: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userPostby: string;
  community_type:
    | "History"
    | "Food"
    | "Pets"
    | "Health"
    | "Fashion"
    | "Exercise"
    | "Others";
  createdAt: string; // or Date
  comments: Comment[];
}
