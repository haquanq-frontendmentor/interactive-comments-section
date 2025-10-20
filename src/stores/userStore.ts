import { defineStore } from "pinia";
import { ref } from "vue";
import data from "../data.json";
import type { User } from "../types/User";

const VOTE_COMMANDS = {
    UPVOTE: "upvote",
    DOWNVOTE: "downvote",
    UNVOTE: "unvote",
} as const;

const VOTE_STATUSES = {
    SWITCH: "switch",
    UNVOTE: "unvote",
    NEW: "new",
} as const;

type VoteCommands = (typeof VOTE_COMMANDS)[keyof typeof VOTE_COMMANDS];
type VoteStatuses = (typeof VOTE_STATUSES)[keyof typeof VOTE_STATUSES];

export const useUserStore = defineStore("current-user", () => {
    const currentUser = ref<User>(data.currentUser);

    const votedComments = ref<Record<number, VoteCommands>>({});

    const voteComment = (commentId: number, command: VoteCommands): VoteStatuses => {
        let result: VoteStatuses = VOTE_STATUSES.SWITCH;

        if (commentId in votedComments.value) {
            if (votedComments.value[commentId] === command) {
                result = VOTE_STATUSES.UNVOTE;
                delete votedComments.value[commentId];
            } else {
                result = VOTE_STATUSES.SWITCH;
                votedComments.value[commentId] = command;
            }
        } else {
            result = VOTE_STATUSES.NEW;
            votedComments.value[commentId] = command;
        }

        return result;
    };

    return {
        currentUser,
        voteComment,
        votedComments,
    };
});
