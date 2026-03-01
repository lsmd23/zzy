import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './SearchResults.css';

// Generate dynamic mock data based on input
const generateMockData = (q, category) => {
    const baseTitle = q ? `关于“${q}”的` : (category ? `[${category}] 领域的` : `母猪的产后`);

    return Array.from({ length: 15 }).map((_, i) => ({
        id: `mock-${i}`,
        title: i % 3 === 0 ? `${baseTitle}护理研究综述与展望` : (i % 3 === 1 ? `${baseTitle}如何在DDL前优雅提交代码` : `${baseTitle}高温对繁殖的影响及烧烤火候研究`),
        authors: i % 2 === 0 ? '张三猪 ; 李四狗' : '王二牛 ; 赵大力',
        journal: category ? (category === '博士猪论文' ? '《汁网优秀博猪士库》' : '《汁网会议辑览》') : (i % 2 === 0 ? '《zzy生命科学研究中心学报》' : '《孜然》'),
        date: `202${Math.floor(Math.random() * 4) + 3}-${String(Math.floor(Math.random() * 11) + 1).padStart(2, '0')}-01`,
        citations: Math.floor(Math.random() * 999),
        downloads: Math.floor(Math.random() * 9999),
    }));
};

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q') || '';
    const category = queryParams.get('category') || '';
    const mockData = generateMockData(q, category);


    return (
        <div className="search-results-page">
            {/* Mini Search Header */}
            <div className="results-search-header">
                <div className="container mini-search-container">
                    <input
                        type="text"
                        className="mini-search-input"
                        defaultValue={q}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') navigate(`/search?q=${e.currentTarget.value}`);
                        }}
                    />
                    <button className="btn btn-primary mini-search-btn">重新检索</button>
                </div>
            </div>

            <div className="container results-layout">
                {/* Left Sidebar (Filters) */}
                <aside className="results-sidebar">
                    <div className="filter-group">
                        <h4>分组浏览</h4>
                        <ul>
                            <li><input type="checkbox" /> 学科分类 <span>(999)</span></li>
                            <li><input type="checkbox" /> 研究层次 <span>(888)</span></li>
                            <li><input type="checkbox" /> 文献类型 <span>(777)</span></li>
                            <li><input type="checkbox" /> 发表年度 <span>(666)</span></li>
                        </ul>
                    </div>
                </aside>

                {/* Main Results Area */}
                <div className="results-main">
                    <div className="results-meta">
                        {category ? (
                            <>找到属于 <span className="highlight-keyword">" {category} "</span> 分类的文献共 <strong>999,999+</strong> 篇</>
                        ) : (
                            <>找到与 <span className="highlight-keyword">" {q || '全部猪脑'} "</span> 相关的文献共 <strong>999,999+</strong> 篇</>
                        )}
                    </div>

                    <table className="results-table">
                        <thead>
                            <tr>
                                <th width="50">序号</th>
                                <th>题名</th>
                                <th width="150">作者</th>
                                <th width="150">来源</th>
                                <th width="100">发表时间</th>
                                <th width="60">被引</th>
                                <th width="60">下载</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockData.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="paper-title">
                                        <Link to="#">{item.title}</Link>
                                    </td>
                                    <td className="paper-authors">{item.authors}</td>
                                    <td className="paper-journal">{item.journal}</td>
                                    <td className="text-center">{item.date}</td>
                                    <td className="text-center highlight-num">{item.citations}</td>
                                    <td className="text-center highlight-num">{item.downloads}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <button className="btn">上一页</button>
                        <span className="page-current">1</span>
                        <button className="btn">2</button>
                        <button className="btn">3</button>
                        <span>...</span>
                        <button className="btn">999</button>
                        <button className="btn">下一页</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
