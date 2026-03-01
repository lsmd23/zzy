import React from 'react';
import './Journals.css';

const journalsData = [
    {
        title: '《孜然》',
        sub_title: '(Nature - BBQ Edition)',
        field: '自然与烧烤科学',
        impactFactor: '999.9',
        description: '国际顶级综合性孜然撒放学期刊。'
    },
    {
        title: '《料学》',
        sub_title: '(Science of Ingredients)',
        field: '食品炼化学',
        impactFactor: '888.8',
        description: '汇聚前沿八角、桂皮与香叶的研究成果。'
    },
    {
        title: '《细菌》',
        sub_title: '(Cell - Spoiled Edition)',
        field: '生命倒推科学',
        impactFactor: '777.7',
        description: '聚焦饭菜放久了之后微观世界的演变。'
    },
    {
        title: '《涩会科学研究》',
        sub_title: '(Awkward Social Science)',
        field: '人类尴尬学',
        impactFactor: '233.3',
        description: '致力于研究社恐人群的各种发病机制与社死瞬间。'
    },
    {
        title: '《zzy生命科学研究中心学报》',
        sub_title: '(ZZY Bio-Center Journal)',
        field: '顶级整活学',
        impactFactor: 'MAX',
        description: '核心收录，权威发布，震撼整个学术圈的学术旗舰。'
    }
];

const Journals = () => {
    return (
        <section className="journals-section">
            <div className="container">
                <div className="section-header">
                    <h3 className="section-title">首批入驻权威期刊</h3>
                    <a href="#" className="more-link">查看更多 &gt;&gt;</a>
                </div>

                <div className="journals-grid">
                    {journalsData.map((journal, index) => (
                        <div className="journal-card" key={index}>
                            <div className="journal-cover">
                                <span className="cover-title">{journal.title}</span>
                                <span className="cover-subtitle">{journal.sub_title}</span>
                            </div>
                            <div className="journal-info">
                                <h4>{journal.title}</h4>
                                <p className="journal-field">领域：{journal.field}</p>
                                <p className="journal-if">影响因子：<span>{journal.impactFactor}</span></p>
                                <p className="journal-desc">{journal.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="news-banner">
                    <div className="news-badge">红酒报讯</div>
                    <p className="news-text">
                        日前，一个名为“汁网”的综合性学术信息服务平台正式启动搭建程序... 平台欢迎广大科研工作猪踊跃投稿，共同打造这一充满活力的学术家园！
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Journals;
