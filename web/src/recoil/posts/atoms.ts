import { atom } from 'recoil';

// 전체 포스트 리스트 불러올 때 관련 상태
interface PostDataListItem {
    postId: number;
    category: string;
    title: string;
    userImage: string;
    userNickname: string;
    likeCount: number;
    viewCount: number;
    accessLevel: boolean;
}

export const postListDataState = atom<PostDataListItem[] | null>({
    key: 'postListDataState',
    default: null,
});

// 게시글 보기 눌렀을 때 관련 상태

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
    accessLevel: boolean;
    replyList: ReplyData[];
    childReplyList: ChildReplyData[];
    images: string[];
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

// 게시글 작성/수정 시 관련 상태

export const titleState = atom<string>({
    key: 'titleState',
    default: '',
});

export const descriptionState = atom<string>({
    key: 'descriptionState',
    default: '',
});

export const hastagListState = atom<string[]>({
    key: 'hastagListState',
    default: [],
});

export const categoryState = atom<string>({
    key: 'categoryState',
    default: '',
});

export const accessLevelState = atom<boolean>({
    key: 'accessLevelState',
    default: true,
});

export const imagesUrlListState = atom<string[]>({
    key: 'imagesUrlArray',
    default: [],
});
