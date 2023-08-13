import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import PostFilter from '../components/Posts/PostFilter';
import PostList from '../components/Posts/PostList';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { loggedInState } from '../recoil/AuthState/atoms';

const Posts: React.FC = () => {
    const loggedIn = useRecoilValue(loggedInState);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        navigate(location.pathname);
    }, []);

    return (
        <Page>
            <Title>커뮤니티</Title>
            <PostFilter />
            <PostList />
            {loggedIn && (
                <Link to="/posts/createpost">
                    <NewPost>게시글 작성</NewPost>
                </Link>
            )}
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 750px;
    // margin -> 150px auto로 변경해야.
    margin: 40px auto;
    // // min-height는 삭제 예정
    min-height: calc(100vh - 300px);
`;

const Title = styled.h1`
    width: 750px;
`;

const NewPost = styled.button`
    position: absolute;
    right: 0px;
    bottom: 0px;
`;

export default Posts;
