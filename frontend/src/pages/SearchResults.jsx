import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { articlesApi } from '../api';
import './SearchResults.css';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q') || '';
    const category = queryParams.get('category') || '';
    const currentPage = parseInt(queryParams.get('page') || '1', 10);

    const [results, setResults] = useState({ items: [], total: 0, page: 1, page_size: 15 });
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(q);

    useEffect(() => {
        setLoading(true);
        setSearchInput(q);
        articlesApi.search(q, category, currentPage)
            .then(setResults)
            .catch((err) => console.error('搜索失败:', err))
            .finally(() => setLoading(false));
    }, [q, category, currentPage]);

    const totalPages = Math.max(1, Math.ceil(results.total / results.page_size));

    const goToPage = (page) => {
        const sp = new URLSearchParams();
        if (q) sp.set('q', q);
        if (category) sp.set('category', category);
        sp.set('page', page);
        navigate(`/search?${sp.toString()}`);
    };

    return (
        <div className="search-results-page">
            {/* Mini Search Header */}
            <div className="results-search-header">
                <div className="container mini-search-container">
                    <input
                        type="text"
                        className="mini-search-input"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') navigate(`/search?q=${encodeURIComponent(searchInput)}`);
                        }}
                    />
                    <button
                        className="btn btn-primary mini-search-btn"
                        onClick={() => navigate(`/search?q=${encodeURIComponent(searchInput)}`)}
                    >重新检索</button>
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
                        {loading ? (
                            <span>猪脑检索引擎正在全力运转中...</span>
                        ) : category ? (
                            <>找到属于 <span className="highlight-keyword">"{category}"</span> 分类的文献共 <strong>{results.total.toLocaleString()}</strong> 篇</>
                        ) : (
                            <>找到与 <span className="highlight-keyword">"{q || '全部猪脑'}"</span> 相关的文献共 <strong>{results.total.toLocaleString()}</strong> 篇</>
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
                            {loading ? (
                                Array.from({ length: 10 }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="text-center">{(currentPage - 1) * 15 + i + 1}</td>
                                        <td colSpan="6" style={{ color: '#bbb', fontStyle: 'italic' }}>数据正在从学术黑洞中飞速传输...</td>
                                    </tr>
                                ))
                            ) : results.items.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                                        暂无相关文献，可能您搜索的太前沿了（或母猪未曾耕耘此领域）。
                                    </td>
                                </tr>
                            ) : (
                                results.items.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="text-center">{(currentPage - 1) * 15 + index + 1}</td>
                                        <td className="paper-title">
                                            <Link to="#">{item.title}</Link>
                                        </td>
                                        <td className="paper-authors">{item.authors}</td>
                                        <td className="paper-journal">{item.journal_id}</td>
                                        <td className="text-center">{item.published_date}</td>
                                        <td className="text-center highlight-num">{item.citations}</td>
                                        <td className="text-center highlight-num">{item.downloads}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {!loading && totalPages > 1 && (
                        <div className="pagination">
                            <button className="btn" disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>上一页</button>
                            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                                const page = i + 1;
                                return (
                                    <button
                                        key={page}
                                        className={`btn ${currentPage === page ? 'page-current' : ''}`}
                                        onClick={() => goToPage(page)}
                                    >{page}</button>
                                );
                            })}
                            {totalPages > 5 && <span>...</span>}
                            {totalPages > 5 && (
                                <button className="btn" onClick={() => goToPage(totalPages)}>{totalPages}</button>
                            )}
                            <button className="btn" disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>下一页</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
