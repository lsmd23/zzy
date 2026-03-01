import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
    const [tab, setTab] = useState('login'); // 'login' | 'register'
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const { login, register } = useAuth();

    if (!isOpen) return null;

    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setErrorMsg('');
    };

    const handleClose = () => {
        resetForm();
        setTab('login');
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');
        try {
            if (tab === 'login') {
                await login(username, password);
            } else {
                if (!email) { setErrorMsg('请填写邮箱'); setIsSubmitting(false); return; }
                await register(username, email, password);
            }
            handleClose();
        } catch (err) {
            setErrorMsg(err.message || '未知错误，猪脑崩溃中...');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={handleClose}>&times;</button>
                <div className="modal-header">
                    <h2 className="modal-title">汁网 - 统一身份认证系统</h2>
                </div>

                <div className="modal-body">
                    {/* Tab switch */}
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                        <button
                            type="button"
                            className={`link-btn${tab === 'login' ? ' active-tab-btn' : ''}`}
                            onClick={() => { setTab('login'); resetForm(); }}
                            style={{ fontWeight: tab === 'login' ? 'bold' : 'normal', fontSize: '15px' }}
                        >登录</button>
                        <span style={{ color: '#ccc' }}>|</span>
                        <button
                            type="button"
                            className={`link-btn${tab === 'register' ? ' active-tab-btn' : ''}`}
                            onClick={() => { setTab('register'); resetForm(); }}
                            style={{ fontWeight: tab === 'register' ? 'bold' : 'normal', fontSize: '15px' }}
                        >注册猪圈账号</button>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>专属猪号（用户名）：</label>
                            <input
                                type="text"
                                placeholder="请输入用户名"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {tab === 'register' && (
                            <div className="form-group">
                                <label>猪圈专属邮箱：</label>
                                <input
                                    type="email"
                                    placeholder="请输入邮箱"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label>密码：</label>
                            <input
                                type="password"
                                placeholder="请输入密码"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {errorMsg && <div className="error-message">{errorMsg}</div>}

                        <button
                            type="submit"
                            className="btn btn-primary login-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? '正在验证生猪信息...'
                                : tab === 'login' ? '登 录' : '立即注册入栏'}
                        </button>
                    </form>
                </div>

                <div className="modal-hint">
                    * 郑重提示：本系统不接入真实的学信网，查不到学历说明您是一头快乐的自由猪。
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
