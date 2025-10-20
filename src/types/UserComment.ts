import type { User } from "./User";

export type UserComment = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replies?: UserComment[];
    replyingTo?: string;
};
