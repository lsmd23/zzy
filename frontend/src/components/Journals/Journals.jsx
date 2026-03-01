import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { journalsApi } from '../../api';
import './Journals.css';

const Journals = () => {
    const navigate = useNavigate();
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        journalsApi.list()
            .then(setJournals)
            .catch((err) => console.error('加载期刊失败:', err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="journals-section">
            <div className="container">
                <div className="section-header">
                    <h3 className="section-title">首批入驻权威期刊</h3>
                    <a href="#" className="more-link">查看更多 &gt;&gt;</a>
                </div>

                {loading ? (
                    <div className="journals-grid">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="journal-card journal-card-skeleton" />
                        ))}
                    </div>
                ) : (
                    <div className="journals-grid">
                        {journals.map((journal) => (
                            <div
                                className="journal-card"
                                key={journal.id}
                                onClick={() => navigate(`/journal/${journal.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="journal-cover">
                                    <span className="cover-title">{journal.title}</span>
                                    <span className="cover-subtitle">{journal.sub_title}</span>
                                </div>
                                <div className="journal-info">
                                    <h4>{journal.title}</h4>
                                    <p className="journal-field">领域：{journal.field}</p>
                                    <p className="journal-if">影响因子：<span>{journal.impact_factor}</span></p>
                                    <p className="journal-desc">{journal.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="news-banner">
                    <div className="news-badge">红酒报讯</div>
                    <p className="news-text">
                        日前，一个名为"汁网"的综合性学术信息服务平台正式启动搭建程序... 平台欢迎广大科研工作猪踊跃投稿，共同打造这一充满活力的学术家园！
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Journals;
