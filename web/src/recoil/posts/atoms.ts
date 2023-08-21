import { atom } from 'recoil';

// 전체 포스트 리스트 불러올 때 관련 상태
interface PostDataListItem {
    postId: number;
    category: string;
    hashtags: string[];
    title: string;
    userImage: string;
    userNickname: string;
    likeCount: number;
    viewCount: number;
    accessLevel: boolean;
}

export const totalPageState = atom<number>({
    key: 'totalPageState',
    default: 0,
});

export const postListDataState = atom<PostDataListItem[] | null>({
    key: 'postListDataState',
    default: null,
});

export const currentPageState = atom<number>({
    key: 'currentPageState',
    default: 1,
});

export const categoryFilterState = atom<string>({
    key: 'categoryFilterState',
    default: '',
});

export const keywordFilterState = atom<string>({
    key: 'keywordFilterState',
    default: '',
});

export const hashtagFilterState = atom<string>({
    key: 'hashtagFilterState',
    default: '',
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

interface PostDataType {
    postId: number;
    userImage: string;
    userNickname: string;
    createdAt: string;
    category: string;
    hashtagList: string[];
    title: string;
    description: string;
    likeCount: number;
    replyCount: number;
    viewCount: number;
    accessLevel: boolean;
    replyList: ReplyData[];
    childReplyList: ChildReplyData[];
    images: string[];
    like: boolean;
}

interface PostContentsDataType {
    userImage: string;
    userNickname: string;
    createdAt: string;
    category: string;
    hashtagList: string[];
    title: string;
    description: string;
    likeCount: number;
    replyCount: number;
    viewCount: number;
    like: boolean;
    accessLevel: boolean;
}

interface ConmentsDataType {
    replyList: ReplyData[];
    childReplyList: ChildReplyData[];
}

export const postDataRecoil = atom<PostDataType>({
    key: 'postDataRecoil',
    default: {
        postId: 0,
        userImage: '',
        userNickname: '',
        createdAt: '',
        category: '',
        hashtagList: [],
        title: '',
        description: '',
        likeCount: 0,
        replyCount: 0,
        viewCount: 0,
        accessLevel: true,
        replyList: [],
        childReplyList: [],
        images: [],
        like: false,
    },
});

export const postContentsDataRecoil = atom<PostContentsDataType>({
    key: 'postContentsDataRecoil',
    default: {
        userImage: '',
        userNickname: '',
        createdAt: '',
        category: '',
        hashtagList: [],
        title: '',
        description: '',
        likeCount: 0,
        replyCount: 0,
        viewCount: 0,
        like: false,
        accessLevel: true,
    },
});

export const conmentsDataRecoil = atom<ConmentsDataType | null>({
    key: 'conmentsDataRecoil',
    default: {
        replyList: [],
        childReplyList: [],
    },
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

export const hashtagListState = atom<string[]>({
    key: 'hashtagListState',
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

export const isLikedState = atom<boolean>({
    key: 'isLikedState',
    default: false,
});
