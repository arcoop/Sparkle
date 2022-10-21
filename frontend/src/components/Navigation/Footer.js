import { Link } from "react-router-dom";
import './Footer.css'

export const Footer = () => {
    return (
        <div id="footer-container">
            <div id="footer-top-section">
                <div id="footer-left-nav">
                    <Link to="/" id="sparkle-logo-section">
                        <p className="nav-home-link-text">sparkle</p>
                        <div className="line-break" id="footer-line-break">
                            <span id="est-text">est. 2022</span>
                        </div>
                        {/* <p>subtitle text</p> */}
                    </Link>
                    <div id="num-quizzes-played"></div>
                </div>

                <div id="footer-right-nav">
                    <div id="footer-links-1"></div>
                    <div id="footer-links-2"></div>
                    <div id="footer-links-3"></div>
                </div>

            </div>
            {/* <div id="footer-bottom-section">
                <div id="footer-bottom-section-1">bottom section1</div>
                <div id="footer-bottom-section-2">bottom section2</div>
                <div id="footer-bottom-section-3">bottom section3</div>
            </div> */}
        </div>
    )
}

export default Footer;