import { defineStore } from "pinia";
import { ref } from "vue";
import data from "../data.json";
import type { UserComment } from "../types/UserComment";
import { useUserStore } from "./userStore";

let localCommentId = 69;

const commentRepliesMap: Record<number, number> = {};

data.comments.forEach((v, index) => {
    if (v.replies)
        v.replies.forEach((vv) => {
            commentRepliesMap[vv.id] = index;
        });
});

export const useCommentStore = defineStore("comments", () => {
    const comments = ref<UserComment[]>(data.comments);

    const findComment = (commentId: number) => {
        let currentComment: UserComment | undefined;

        if (commentId in commentRepliesMap) {
            const currentCommentThread = comments.value[commentRepliesMap[commentId] as number];
            if (!currentCommentThread)
                throw new Error("Comment thread with id: " + commentRepliesMap[commentId] + " not found!");
            currentComment = currentCommentThread.replies?.find((v) => v.id === commentId);
        } else {
            currentComment = comments.value.find((v) => v.id === commentId);
        }

        if (!currentComment) throw new Error("Comment  with id: " + commentRepliesMap[commentId] + " not found!");
        return currentComment;
    };

    const addComment = (content: string, replyingTo?: { username: string; parentCommentId: number }) => {
        const { currentUser } = useUserStore();

        const newComment: UserComment = {
            id: ++localCommentId,
            createdAt: new Date().toLocaleString(),
            content,
            score: 0,
            user: currentUser,
        };

        if (replyingTo) {
            const currentCommentThread = comments.value.find((v) => v.id === replyingTo.parentCommentId);
            if (!currentCommentThread)
                throw new Error("Comment thread with id: " + replyingTo.parentCommentId + " not found!");

            if (!currentCommentThread.replies) {
                currentCommentThread.replies = [];
            }

            newComment.replyingTo = replyingTo.username;
            currentCommentThread.replies.push(newComment);
        } else {
            comments.value.push(newComment);
        }
    };

    const removeComment = (commentId: number) => {
        if (commentId in commentRepliesMap) {
            const currentCommentThread = comments.value[commentRepliesMap[commentId] as number];
            if (!currentCommentThread)
                throw new Error("Comment thread with id: " + commentRepliesMap[commentId] + " not found!");

            currentCommentThread.replies = currentCommentThread.replies?.filter((v) => v.id !== commentId);
        } else {
            comments.value = comments.value.filter((v) => v.id !== commentId);
        }
    };

    const updateComment = (commentId: number, content: string) => {
        const currentComment = findComment(commentId);
        console.log(currentComment.content, content);
        currentComment.content = content;
    };

    const upvoteComment = (commentId: number) => {
        const { voteComment } = useUserStore();
        const voteStatus = voteComment(commentId, "upvote");
        const currentComment = findComment(commentId);

        if (voteStatus === "new") {
            currentComment.score++;
        } else if (voteStatus === "switch") {
            currentComment.score += 2;
        } else if (voteStatus === "unvote") {
            currentComment.score--;
        }
    };

    const downvoteComment = (commentId: number) => {
        const { voteComment } = useUserStore();
        const voteStatus = voteComment(commentId, "downvote");
        const currentComment = findComment(commentId);

        if (voteStatus === "new") {
            currentComment.score--;
        } else if (voteStatus === "switch") {
            currentComment.score -= 2;
        } else if (voteStatus === "unvote") {
            currentComment.score++;
        }
    };

    return { addComment, removeComment, updateComment, upvoteComment, downvoteComment, findComment, comments };
});
