import React from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { isLoginSelector } from '../../recoil/AuthState/selectors';

const ProtectedRoute: React.FC = () => {
    const isLogin = useRecoilValue(isLoginSelector);
    const currentLocation = useLocation();

    if (isLogin) {
        return <Outlet />;
    } else {
        return (
            <Navigate to="/signin" replace state={{ redirectedFrom: currentLocation.pathname }} />
        );
    }
};

export default ProtectedRoute;
