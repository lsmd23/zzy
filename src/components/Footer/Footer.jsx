import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="zhiwang-footer">
            <div className="container footer-content">
                <div className="footer-links">
                    <a href="#">关于我们 (About Us)</a> |
                    <a href="#">免责声明 (Disclaimer)</a> |
                    <a href="#">用户指南 (Pigpen Guide)</a> |
                    <a href="#">联系客服 (Contact No One)</a> |
                    <a href="#">网站地图 (Site Map)</a>
                </div>

                <div className="footer-info">
                    <p>
                        郑重声明：本网站为“整活”项目，仅供娱乐与学习交流使用。所有内容纯属虚构，并非真实的学术平台。
                        <br />
                        如果本页面给您带来了“这是一本正经做学问的地方”的错觉，那么说明我们的前端切图仔技术还过得去。
                    </p>
                    <p className="copyright">
                        © {new Date().getFullYear()} 汁网 (Zhiwang) 学术猪圈 版权所有 - 最终解释权归zzy整活委员会所有
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
