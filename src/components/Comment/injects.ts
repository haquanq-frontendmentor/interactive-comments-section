import type { InjectionKey, Ref } from "vue";

type CommentSectionManager = {
    replyingCommentId: Ref<number | null>;
    setReplyingCommentId: (commentId: number | null) => void;
    editingCommentId: Ref<number | null>;
    setEditingCommentId: (commentId: number | null) => void;
};

const COMMENT_SECTION_INJECT_KEY = Symbol() as InjectionKey<string>;

export { COMMENT_SECTION_INJECT_KEY, type CommentSectionManager };
