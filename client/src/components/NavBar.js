import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from './../services/user';

export default function NavBar({ setIsLogin, hasAuth }) {
    const navigate = useNavigate();

    const onLogOutBtnClick = async () => {
        try {
            await UserService.logOutUser();
            localStorage.removeItem('tokenStore');
            setIsLogin(false);
        } catch (e) {
            console.error(e);
        }
    };

    const onCreateNoteBtnClick = async () => {
        navigate('/create');
    };

    const onHomeBtnClick = async () => {
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
            <Link className="navbar-brand" to="/">
                <div className="d-flex align-items-center">
                    <i className="far fa-sticky-note fa-2x"></i>
                    <span className="h4 ms-2">Note Taking App</span>
                </div>
            </Link>
            {hasAuth && (
                <div className="d-flex justify-content-end flex-fill">
                    <button
                        type="button"
                        onClick={onHomeBtnClick}
                        className="btn btn-secondary me-2"
                    >
                        <i className="fas fa-home me-2"></i>Home
                    </button>
                    <button
                        type="button"
                        onClick={onCreateNoteBtnClick}
                        className="btn btn-primary me-2"
                    >
                        <i className="fas fa-plus-circle me-2"></i>Create Note
                    </button>
                    <button
                        type="button"
                        onClick={onLogOutBtnClick}
                        className="btn btn-link"
                    >
                        <span>Logout</span>
                        <i className="fas fa-sign-out-alt ms-2"></i>
                    </button>
                </div>
            )}
        </nav>
    );
}
