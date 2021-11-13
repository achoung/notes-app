import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../services/user';

export default function Login({ setIsLogin }) {
    const [user, setUser] = useState({ email: '', password: '' });
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErr('');
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await UserService.logInUser({
                email: user.email,
                password: user.password,
            });
            if (!res?.data?.token) {
                setErr(err.response.data.msg);
            } else {
                setUser({ email: '', password: '' });
                localStorage.setItem('tokenStore', res.data.token);
                setIsLogin(true);
                navigate('/');
            }
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                {err && (
                    <div className="alert alert-danger me-1">
                        <span className="fw-bold">Error: </span>
                        <span>{err}</span>
                    </div>
                )}
                <form onSubmit={loginSubmit}>
                    <h3>Sign In</h3>
                    <div className="mb-3">
                        <label id="login-email-label" className="form-label">
                            Email Address
                        </label>
                        <input
                            id="login-email"
                            data-test-id="login-email-field"
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            required
                            value={user.email}
                            onChange={onChangeInput}
                            aria-label="Email"
                            aria-describedby="login-email-label"
                        />
                    </div>
                    <div className="mb-3">
                        <label id="login-password-label" className="form-label">
                            Password
                        </label>
                        <input
                            id="login-password"
                            data-test-id="login-password-field"
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter Password"
                            required
                            value={user.password}
                            autoComplete="true"
                            onChange={onChangeInput}
                            aria-label="Password"
                            aria-describedby="login-password-label"
                        />
                    </div>
                    <button
                        data-test-id="login-submit-btn"
                        className="btn btn-primary btn-block"
                        type="submit"
                    >
                        Login
                    </button>
                    <div className="text-end mt-3">
                        Don't have an account?{' '}
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
