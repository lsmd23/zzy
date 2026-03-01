import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
    const [pigId, setPigId] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleLogin = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');

        setTimeout(() => {
            setIsSubmitting(false);
            setErrorMsg('猪脑容量不足，验证失败。请联系饲养员或稍后再试。');
        }, 1500);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>&times;</button>
                <div className="modal-header">
                    <h2 className="modal-title">汁网 - 统一身份认证系统</h2>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label>专属猪号 / 邮箱：</label>
                            <input
                                type="text"
                                placeholder="请输入您的11位猪耳标编号"
                                required
                                value={pigId}
                                onChange={(e) => setPigId(e.target.value)}
                            />
                        </div>
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
                            {isSubmitting ? '正在验证生猪信息...' : '登 录'}
                        </button>

                        <div className="form-footer">
                            <a href="#">忘记密码？</a>
                            <a href="#">饲养员注册</a>
                        </div>
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
