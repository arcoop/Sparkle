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

                <div id=""></div>

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
                        <div className="footer-links">
                            <p className="footer-header">Reach Me</p>
                            <a target="_blank" href="https://adina-cooper.com/" className="footer-item-link">About Me</a>
                            <a target="_blank" href="https://www.linkedin.com/in/adina-cooper/" className="footer-item-link">LinkedIn</a>
                            <a target="_blank" href="https://angel.co/u/adina-cooper-1" className="footer-item-link">AngelList</a>
                            <a target="_blank" href="https://github.com/arcoop" className="footer-item-link">GitHub</a>
                            <a target="_blank" href="mailto:cooperadina@gmail.com?subject='Love your work!'&body='Really enjoyed looking at your work. Would love to set up a time to talk.'" className="footer-item-link">Email</a>
                        </div>
                    </div>
                    <div id="last-footer-links-section" className="footer-links-section">
                        <div className="line-separator"></div>
                        <div className="footer-links">
                            <p className="footer-header">Other Projects</p>
                            <a target="_blank" href="https://arcoop.github.io/Bang/" className="footer-item-link">Bang!</a>
                            <a target="_blank" href="https://cubberd.herokuapp.com/about" className="footer-item-link">Cubberd</a>
                            <a target="_blank" href="" className="footer-item-link">Resume</a>
                        </div>

                    </div>
                </div>
        </div>
    )
}

export default Footer;