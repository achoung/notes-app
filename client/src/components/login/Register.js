import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../services/user';
import { toast } from 'react-toastify';

export default function Register({ setIsLogin }) {
    const [user, setUser] = useState({ email: '', password: '' });
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErr('');
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.createUser({
                email: user.email,
                password: user.password,
            });

            toast('User registered successfully!');
            navigate('/login');
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
                <form onSubmit={registerSubmit}>
                    <h3>Register New Account</h3>
                    <div className="mb-3">
                        <label id="login-email-label" className="form-label">
                            Email Address
                        </label>
                        <input
                            id="login-email"
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
                    <button className="btn btn-primary btn-block" type="submit">
                        Register
                    </button>
                    <div className="text-end mt-3">
                        Already have an account?{' '}
                        <Link to="/login">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
