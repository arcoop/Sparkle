import { Link } from "react-router-dom";
import './Footer.css'

export const Footer = () => {
    return (
        <div id="footer-container">
                <div id="footer-left-nav">
                    <Link to="/" id="sparkle-logo-section">
                        <p className="nav-home-link-text">sparkle</p>
                        <div className="line-break" id="footer-line-break">
                            <div id="est-text">est. 2022</div>
                            <div id="sub-footer-line-break"></div>
                        </div>
                        <p className="footer-subtext">mentally stimulating diversions</p>
                    </Link>
                    <div id="num-quizzes-played"></div>
                </div>

                <div id="footer-middle-nav"></div>

                <div id="footer-right-nav">
                    <div className="footer-links-section">
                        <div>
                            <p className="footer-header">Technologies</p>
                            <p className="footer-item">Javascript</p>
                            <p className="footer-item">React.js</p>
                            <p className="footer-item">Redux</p>
                            <p className="footer-item">Ruby Rails</p>
                            <p className="footer-item">AWS</p>
                        </div>
                    </div>
                    <div className="footer-links-section">
                        <div className="line-separator"></div>
                        <div>
                            <p className="footer-header">Reach Me</p>
                            <p className="footer-item">About Me</p>
                            <p className="footer-item">LinkedIn</p>
                            <p className="footer-item">AngelList</p>
                            <p className="footer-item">GitHub</p>
                            <p className="footer-item">Email</p>
                        </div>
                    </div>
                    <div id="last-footer-links-section" className="footer-links-section">
                        <div className="line-separator"></div>
                        <div>
                            <p className="footer-header">Other Projects</p>
                            <p className="footer-item">Bang!</p>
                            <p className="footer-item">Cubberd</p>
                            <p className="footer-item">Resume</p>
                        </div>

                    </div>
                </div>
        </div>
    )
}

export default Footer;