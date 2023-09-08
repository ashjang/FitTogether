import React, { useEffect } from 'react';
import PostListItem from './PostListItem';
import { useRecoilValue } from 'recoil';
import { postListDataState } from '../../recoil/posts/atoms';
import styled from '@emotion/styled';
import Spinner from '../../assets/Spinner.svg';

const PostList: React.FC = () => {
    const postListData = useRecoilValue(postListDataState);

    function ScrollToTopOnPageChange() {
        useEffect(() => {
            window.scrollTo(0, 0); // Scroll to the top on route change
        }, []);

        return null;
    }

    return (
        <PostListComponent>
            <ScrollToTopOnPageChange />
            <PostListItems>
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
