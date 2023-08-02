import React from 'react';
import styled from '@emotion/styled';

import { User } from './Map';

interface UserProfileProps {
    user: User;
    onClose: () => void;
}
const UserProfile: React.FC<UserProfileProps> = ({ user, onClose }) => {
    return (
        <UserProfileContainer>
            <h2>User Profile</h2>
            <p>Id: {user.id}</p>
            <p>Category: {user.category}</p>
            <button onClick={onClose}>Close</button>
        </UserProfileContainer>
    );
};
const UserProfileContainer = styled.div``;
export default UserProfile;
