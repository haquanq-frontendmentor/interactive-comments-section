import type { User } from "./User";

export type CommentThread = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replies?: CommentThread[];
    replyingTo?: string;
};
