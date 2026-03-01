import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './JournalDetail.css';

const JOURNAL_DB = {
    'zi-ran': {
        title: '《孜然》',
        sub_title: '(Nature - BBQ Edition)',
        field: '自然与烧烤科学',
        impactFactor: '999.9',
        publisher: '撸串联合大学出版社',
        frequency: '月发 (取决于夜市开门情况)',
        description: '国际顶级综合性孜然撒放学期刊。致力于将烧烤的手法提升到分子层面，解析辣椒面中氨基酸序列的味觉表达。',
        articles: [
            { id: 1, title: '烧烤摊社交中啤酒碰杯的最佳物理角度及声学响应', authors: '王大漂亮', date: '2025-05-20', citations: 120 },
            { id: 2, title: '论韭菜与金针菇在铁板上的吸油动力学', authors: '张烤神', date: '2025-04-18', citations: 89 }
        ]
    },
    'zzy-center': {
        title: '《zzy生命科学研究中心学报》',
        sub_title: '(ZZY Bio-Center Journal)',
        field: '顶级整活学',
        impactFactor: 'MAX',
        publisher: 'zzy整活委员会',
        frequency: '不定时抽风 (看心情)',
        description: '核心收录，权威发布，震撼整个学术圈的学术旗舰。在这里，生命的真谛就是没有真谛。',
        articles: [
            { id: 1, title: '当代青年半夜不睡刷视频导致多巴胺过度分泌的综合治理', authors: '李卷猪 ; 赵摸鱼', date: '2026-02-30', citations: 9999 },
            { id: 2, title: 'zzy生科院食堂菜系演变对学生体质及精神状态的深远影响', authors: '干饭人', date: '2026-01-15', citations: 8888 }
        ]
    },
    'default': {
        title: '《未知神刊》',
        sub_title: '(Unknown Phenomenon)',
        field: '未知领域',
        impactFactor: 'NaN',
        publisher: '宇宙深处',
        frequency: '量子态',
        description: '该期刊过于神秘，连猪脑都无法解析其内容。',
        articles: []
    }
};

const JournalDetail = () => {
    const { id } = useParams();
    const journalInfo = JOURNAL_DB[id] || JOURNAL_DB['default'];

    return (
        <div className="journal-detail-page">
            <div className="container detail-container">
                {/* Left: Journal Cover & Basic Info */}
                <aside className="journal-sidebar">
                    <div className="detail-cover">
                        <h2 className="detail-cover-title">{journalInfo.title}</h2>
                        <p className="detail-cover-subtitle">{journalInfo.sub_title}</p>
                    </div>
                    <div className="detail-sidebar-info">
                        <p><strong>主管单位：</strong>{journalInfo.publisher}</p>
                        <p><strong>出版周期：</strong>{journalInfo.frequency}</p>
                        <p><strong>所属学科：</strong>{journalInfo.field}</p>
                        <div className="impact-factor-box">
                            复合影响因子：<span>{journalInfo.impactFactor}</span>
                        </div>
                        <button className="btn btn-primary btn-block mock-submit-btn">
                            我要向本刊丢稿 (Submit)
                        </button>
                    </div>
                </aside>

                {/* Right: Intro & Articles */}
                <div className="journal-main">
                    <div className="journal-header-info">
                        <h1 className="journal-main-title">{journalInfo.title}</h1>
                        <h3 className="journal-main-subtitle">{journalInfo.sub_title}</h3>
                        <p className="journal-description">{journalInfo.description}</p>
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
                            {journalInfo.articles.length > 0 ? (
                                journalInfo.articles.map(article => (
                                    <li key={article.id} className="article-item">
                                        <div className="article-title">
                                            <Link to="#">{article.title}</Link>
                                        </div>
                                        <div className="article-meta">
                                            <span className="author">作者：{article.authors}</span>
                                            <span className="date">时间：{article.date}</span>
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
        </div>
    );
};

export default JournalDetail;
