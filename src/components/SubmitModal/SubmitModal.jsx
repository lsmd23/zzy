import React, { useState } from 'react';
import './SubmitModal.css';

const SubmitModal = ({ isOpen, onClose, journalName }) => {
    const [step, setStep] = useState(1); // 1: input, 2: uploading, 3: reviewing, 4: result
    const [paperTitle, setPaperTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [resultStatus, setResultStatus] = useState(null); // 'rejected' or 'accepted'

    const handleClose = () => {
        setStep(1);
        setPaperTitle('');
        setAuthorName('');
        setUploadProgress(0);
        setResultStatus(null);
        onClose();
    };

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!paperTitle || !authorName) return;

        setStep(2); // Start Upload

        // Simulate upload
        let progress = 0;
        const uploadInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 20) + 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(uploadInterval);
                setTimeout(() => startReview(), 500);
            }
            setUploadProgress(progress);
        }, 300);
    };

    const startReview = () => {
        setStep(3); // Start Review

        // Simulate AI review
        setTimeout(() => {
            // 80% chance of rejection, 20% accepted
            const isAccepted = Math.random() > 0.8;
            setResultStatus(isAccepted ? 'accepted' : 'rejected');
            setStep(4);
        }, 2500);
    };

    return (
        <div className="submit-modal-overlay">
            <div className="submit-modal-content">
                <button className="submit-modal-close" onClick={handleClose}>&times;</button>

                <div className="submit-modal-header">
                    <h2>向 {journalName} 丢稿系统</h2>
                    <p>The Most Rigorous Academic Blackhole</p>
                </div>

                <div className="submit-modal-body">
                    {step === 1 && (
                        <form onSubmit={handleSubmit} className="submit-form">
                            <div className="submit-form-group">
                                <label>论文题名 (Article Title)</label>
                                <input
                                    type="text"
                                    placeholder="例如：论如何在DDL前优雅提交代码"
                                    value={paperTitle}
                                    onChange={(e) => setPaperTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="submit-form-group">
                                <label>通讯作者 (Corresponding Author)</label>
                                <input
                                    type="text"
                                    placeholder="请输入猪圈认证书上的合法姓名"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="submit-form-group">
                                <label>上传手稿 (Upload Manuscript)</label>
                                <div className="upload-box">
                                    <span className="upload-icon">📄</span>
                                    <p>点击或拖拽您的虚假论文到此处上传 (仅支持 .txt, .pdf, .word(不可能的))</p>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary submit-action-btn">
                                确认丢稿 (Submit to Blackhole)
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="processing-state">
                            <h3>正在疯狂上传... ({uploadProgress}%)</h3>
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                            <p className="hint-text">如果进度条卡住，说明您的论文太重了...</p>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="processing-state">
                            <div className="review-spinner"></div>
                            <h3>AI 猪脑主编正在进行盲审...</h3>
                            <p className="hint-text">正在检查文章的查重率（如果您抄袭了，我们可能会要求更高的版面费）。</p>
                        </div>
                    )}

                    {step === 4 && (
                        <div className={`result-state ${resultStatus}`}>
                            {resultStatus === 'rejected' ? (
                                <>
                                    <div className="result-icon reject-icon">❌</div>
                                    <h3>文章悲剧了 (REJECTED)</h3>
                                    <p className="result-desc">
                                        <strong>主编意见：</strong>
                                        您的文章《{paperTitle}》过于严肃，毫无整活气息，不符合本刊办刊宗旨。建议改投《Nature》或《Science》。
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="result-icon accept-icon">🎉</div>
                                    <h3>直接录用 (ACCEPTED)</h3>
                                    <p className="result-desc">
                                        <strong>主编意见：</strong>
                                        太棒了！《{paperTitle}》这篇文章充满了学术垃圾的味道，完全就是我们需要的！我们甚至没有读它！
                                    </p>
                                    <div className="pay-charge-box">
                                        <p>请立即缴纳版面费以安排刊发：</p>
                                        <strong>10kg 优质母猪饲料 (或等值人民币 99,999 元)</strong>
                                    </div>
                                </>
                            )}
                            <button className="btn btn-secondary back-btn" onClick={handleClose}>
                                含泪接受 (Close)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmitModal;
