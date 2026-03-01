import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SubmitModal from '../components/SubmitModal/SubmitModal';
import { journalsApi } from '../api';
import './JournalDetail.css';

const JournalDetail = () => {
    const { id } = useParams();
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        journalsApi.get(id)
            .then(setJournal)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="journal-detail-page">
                <div className="container detail-container" style={{ textAlign: 'center', padding: '60px 0' }}>
                    <p style={{ color: '#888', fontSize: '18px' }}>正在从学术深渊中捞取期刊数据...</p>
                </div>
            </div>
        );
    }

    if (error || !journal) {
        return (
            <div className="journal-detail-page">
                <div className="container detail-container" style={{ textAlign: 'center', padding: '60px 0' }}>
                    <p style={{ color: '#c00', fontSize: '18px' }}>
                        ❌ {error || '此刊已卷铺盖跑路，找不到了。'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="journal-detail-page">
            <div className="container detail-container">
                {/* Left: Journal Cover & Basic Info */}
                <aside className="journal-sidebar">
                    <div className="detail-cover">
                        <h2 className="detail-cover-title">{journal.title}</h2>
                        <p className="detail-cover-subtitle">{journal.sub_title}</p>
                    </div>
                    <div className="detail-sidebar-info">
                        <p><strong>主管单位：</strong>{journal.publisher}</p>
                        <p><strong>出版周期：</strong>{journal.frequency}</p>
                        <p><strong>所属学科：</strong>{journal.field}</p>
                        <div className="impact-factor-box">
                            复合影响因子：<span>{journal.impact_factor}</span>
                        </div>
                        <button
                            className="btn btn-primary btn-block mock-submit-btn"
                            onClick={() => setIsSubmitModalOpen(true)}
                        >
                            我要向本刊丢稿 (Submit)
                        </button>
                    </div>
                </aside>

                {/* Right: Intro & Articles */}
                <div className="journal-main">
                    <div className="journal-header-info">
                        <h1 className="journal-main-title">{journal.title}</h1>
                        <h3 className="journal-main-subtitle">{journal.sub_title}</h3>
                        <p className="journal-description">{journal.description}</p>
                        <div className="journal-award">
                            <span className="award-badge">全国百强搞笑报刊</span>
                            <span className="award-badge">中国核心整活期刊</span>
                        </div>
                    </div>

                    <div className="journal-articles">
                        <div className="articles-tabs">
                            <span className="active-tab">最新录用</span>
                            <span>当期目录</span>
                            <span>高被引文献</span>
                        </div>

                        <ul className="article-list">
                            {journal.articles && journal.articles.length > 0 ? (
                                journal.articles.map(article => (
                                    <li key={article.id} className="article-item">
                                        <div className="article-title">
                                            <Link to="#">{article.title}</Link>
                                        </div>
                                        <div className="article-meta">
                                            <span className="author">作者：{article.authors}</span>
                                            <span className="date">时间：{article.published_date}</span>
                                            <span className="cite">被引：<span className="highlight-num">{article.citations}</span></span>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="no-data">本刊暂无内容，编辑卷铺盖跑路了。</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <SubmitModal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
                journalId={id}
                journalName={journal.title}
            />
        </div>
    );
};

export default JournalDetail;
