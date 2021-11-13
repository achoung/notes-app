import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ hasAuth, children }) => {
    if (!hasAuth) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default AuthenticatedRoute;
