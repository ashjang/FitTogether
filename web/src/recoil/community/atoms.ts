import { atom } from 'recoil';

interface ReplyData {
    postId: number;
    replyId: number;
    userImage: string;
    userNickname: string;
    createdAt: string;
    comment: string;
}

interface ChildReplyData {
    postId: number;
    replyId: number;
    childReplyId: number;
    userImage: string;
    userNickname: string;
    createdAt: string;
    comment: string;
}

interface PostData {
    postId: number;
    userImage: string;
    userNickname: string;
    createdAt: string;
    category: string;
    hashtag: string[];
    title: string;
    description: string;
    likeCount: number;
    replyCount: number;
    viewCount: number;
    replyList: ReplyData[];
    childReplyList: ChildReplyData[];
}

export const postDataState = atom<PostData | null>({
    key: 'postDataState',
    default: null,
});

export const replyDataState = atom<ReplyData[] | null>({
    key: 'replyDataState',
    default: null,
});

export const childReplyDataState = atom<ChildReplyData[] | null>({
    key: 'childReplyDataState',
    default: null,
});
