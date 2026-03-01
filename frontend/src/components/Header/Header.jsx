import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="zhiwang-header">
        <div className="top-bar">
          <div className="container top-bar-content">
            <div className="top-bar-left">
              {user ? (
                <>
                  <span>欢迎，<strong>{user.username}</strong> 猪！</span>
                  <button className="link-btn" onClick={handleLogout}>退出登录</button>
                </>
              ) : (
                <>
                  <span>欢迎来到汁网！</span>
                  <button className="link-btn" onClick={() => setIsLoginModalOpen(true)}>登录</button> |
                  <button className="link-btn" onClick={() => setIsLoginModalOpen(true)}>注册猪圈账号</button>
                </>
              )}
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
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} end>首页</NavLink></li>
                <li><NavLink to="/search?category=期刊" className={() => window.location.search.includes('category=期刊') ? "active" : ""}>期刊</NavLink></li>
                <li><NavLink to="/search?category=博士猪论文" className={() => window.location.search.includes('category=博士猪论文') ? "active" : ""}>博士猪论文</NavLink></li>
                <li><NavLink to="/search?category=会议" className={() => window.location.search.includes('category=会议') ? "active" : ""}>会议</NavLink></li>
                <li><NavLink to="/search?category=学术猪圈" className={() => window.location.search.includes('category=学术猪圈') ? "active" : ""}>学术猪圈</NavLink></li>
                <li><NavLink to="/search?category=年鉴" className={() => window.location.search.includes('category=年鉴') ? "active" : ""}>年鉴</NavLink></li>
                <li><NavLink to="/search?category=专利" className={() => window.location.search.includes('category=专利') ? "active" : ""}>专利</NavLink></li>
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
