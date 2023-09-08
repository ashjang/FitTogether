import React from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { postListDataState } from '../../recoil/posts/atoms';
import PostListItem from './PostListItem';
import Spinner from '../../assets/Spinner.svg';

const PostList: React.FC = () => {
    // postListData 데이터는 PostFilter 컴포넌트에서 저장됨
    const postListData = useRecoilValue(postListDataState);

    return (
        <PostListComponent>
            <PostListItems>
                {/* postListData가 null이 아니라면 postListData 배열의 정보를 토대로 PostListItem을 렌더링 */}
                {postListData ? (
                    postListData.map((post) => <PostListItem key={post.postId} {...post} />)
                ) : (
                    <LoadingSpinner src={Spinner} alt="Loading" />
                )}
            </PostListItems>
        </PostListComponent>
    );
};

const PostListComponent = styled.div``;

const PostListItems = styled.div`
    width: 1000px;
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoadingSpinner = styled.img``;

export default PostList;
