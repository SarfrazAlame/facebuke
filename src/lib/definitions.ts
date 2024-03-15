import { Comment, Like, Post, SavePost, User } from "@prisma/client";

export type CommentType = Comment & { user: User }
export type LikeType = Like & { user: User }

export type PostType = Post & {
    comments: CommentType[],
    likes: LikeType[],
    user: User
}