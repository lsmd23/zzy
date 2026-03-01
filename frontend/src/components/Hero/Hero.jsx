import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className="hero-section">
            <div className="container hero-content">
                <h2 className="hero-slogan">
                    致力于汇聚多学料前沿成果，为广大学猪提供便捷、高笑的学术资源交流渠道。
                </h2>

                <div className="search-box-container">
                    <div className="search-tabs">
                        <button className="search-tab active">文献</button>
                        <button className="search-tab">期刊</button>
                        <button className="search-tab">博猪士</button>
                        <button className="search-tab">会议</button>
                        <button className="search-tab">专利</button>
                        <button className="search-tab">年鉴</button>
                        <button className="search-tab">更多猪脑...</button>
                    </div>

                    <div className="search-input-group">
                        <select className="search-select">
                            <option value="all">全部猪脑</option>
                            <option value="title">篇名</option>
                            <option value="author">作者</option>
                            <option value="keyword">关键词</option>
                            <option value="abstract">摘要</option>
                        </select>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="请输入检索词，例如：如何科学地吃猪食"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button className="search-btn" onClick={handleSearch}>
                            检 索
                        </button>
                    </div>

                    <div className="hot-searches">
                        <span>热搜词：</span>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/search?q=母猪的产后护理'); }}>母猪的产后护理</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/search?q=高温对细菌繁殖的影响及烧烤火候研究'); }}>高温对细菌繁殖的影响及烧烤火候研究</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/search?q=zzy生科院食堂菜系演变'); }}>zzy生科院食堂菜系演变</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/search?q=孜然与料学的终极配比'); }}>孜然与料学的终极配比</a>
                    </div>
                </div>

                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-num">9,999,999+</div>
                        <div className="stat-label">收录文献总数</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-num">8,888+</div>
                        <div className="stat-label">入驻权威期刊</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-num">100%</div>
                        <div className="stat-label">纯粹整活率</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
