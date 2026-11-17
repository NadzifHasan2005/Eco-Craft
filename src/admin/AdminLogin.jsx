import React, { useState } from 'react';
import { Leaf, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Identifikasi login sederhana (Dapat dihubungkan dengan API PHP/MySQL)
        if (email === 'admin@ecocraft.id' && password === 'admin123') {
        onLoginSuccess();
        } else {
        setErrorMsg('Email atau password admin salah!');
        }
    };

    return (
        <div className="login-bg">
        <div className="login-card">
            <div className="login-brand">
            <div className="login-logo-box">
                <Leaf size={32} color="#1B4332" />
            </div>
            <h2>Panel Admin EcoCraft</h2>
            <p>Kelola artikel, tutorial DIY, dan pantau statistik website</p>
            </div>

            {errorMsg && <div className="login-error">{errorMsg}</div>}

            <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
                <label>Email Admin</label>
                <div className="input-icon-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                    type="email"
                    placeholder="admin@ecocraft.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
            </div>

            <div className="form-group">
                <label>Password</label>
                <div className="input-icon-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    className="toggle-pwd"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                </div>
            </div>

            <button type="submit" className="btn-login">
                Masuk ke Dashboard <ArrowRight size={18} />
            </button>
            </form>
        </div>
        </div>
    );
}