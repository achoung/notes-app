import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginRoute = ({ hasAuth, children }) => {
    if (hasAuth) {
        return <Navigate to="/" />;
    }
    return children;
};

export default LoginRoute;
