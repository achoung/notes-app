import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UserService from './services/user';
import NavBar from './components/NavBar';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Home from './components/notes/Home';
import CreateNote from './components/notes/CreateNote';
import EditNote from './components/notes/EditNote';
import ViewNote from './components/notes/ViewNote';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import LoginRoute from './components/routes/LoginRoute';

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoadingCheckLogin, setIsLoadingCheckLogin] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            setIsLoadingCheckLogin(true);
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const res = await UserService.isUserLoggedIn();
                if (res.data) {
                    setIsLogin(true);
                } else {
                    return localStorage.removeItem('tokenStore');
                }
            } else {
                setIsLogin(false);
            }
            setIsLoadingCheckLogin(false);
        };

        checkLogin();
    }, []);

    return (
        <BrowserRouter>
            <div className="app-container">
                <NavBar hasAuth={isLogin} setIsLogin={setIsLogin} />
                <div className="body-container">
                    {!isLoadingCheckLogin && (
                        <Routes>
                            <Route
                                path="/login"
                                element={
                                    <LoginRoute hasAuth={isLogin}>
                                        <Login setIsLogin={setIsLogin} />
                                    </LoginRoute>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <LoginRoute hasAuth={isLogin}>
                                        <Register setIsLogin={setIsLogin} />
                                    </LoginRoute>
                                }
                            />
                            <Route
                                path="/"
                                element={
                                    <AuthenticatedRoute hasAuth={isLogin}>
                                        <Home />
                                    </AuthenticatedRoute>
                                }
                            />
                            <Route
                                path="/create"
                                element={
                                    <AuthenticatedRoute hasAuth={isLogin}>
                                        <CreateNote />
                                    </AuthenticatedRoute>
                                }
                            />
                            <Route
                                path="/edit/:id"
                                element={
                                    <AuthenticatedRoute hasAuth={isLogin}>
                                        <EditNote />
                                    </AuthenticatedRoute>
                                }
                            />
                            <Route
                                path="/:id"
                                element={
                                    <AuthenticatedRoute hasAuth={isLogin}>
                                        <ViewNote />
                                    </AuthenticatedRoute>
                                }
                            />
                        </Routes>
                    )}
                </div>
                <ToastContainer />
            </div>
        </BrowserRouter>
    );
}

export default App;
