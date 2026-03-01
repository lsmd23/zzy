import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import './Header.css';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <header className="zhiwang-header">
        <div className="top-bar">
          <div className="container top-bar-content">
            <div className="top-bar-left">
              <span>欢迎来到汁网！</span>
              <button className="link-btn" onClick={() => setIsLoginModalOpen(true)}>登录</button> |
              <button className="link-btn" onClick={() => setIsLoginModalOpen(true)}>注册猪圈账号</button>
            </div>
            <div className="top-bar-right">
              <a href="#">英文版 (English version coming never)</a>
              <a href="#">无障碍阅读 (Just Squint)</a>
              <a href="#">手机版 (Who reads this on phone?)</a>
            </div>
          </div>
        </div>
        <div className="main-nav">
          <div className="container nav-content">
            <Link to="/" className="logo-area" style={{ textDecoration: 'none' }}>
              <h1 className="logo-text">汁网</h1>
              <span className="logo-subtext">ZHIWANG ACADEMIC PIGPEN</span>
            </Link>
            <nav className="nav-links">
              <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>首页</NavLink></li>
                <li><a href="#">期刊</a></li>
                <li><a href="#">博士猪论文</a></li>
                <li><a href="#">会议</a></li>
                <li><a href="#">学术猪圈</a></li>
                <li><a href="#">年鉴</a></li>
                <li><a href="#">专利</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;
