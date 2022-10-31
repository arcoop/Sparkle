import { useState } from "react";
import { useHistory } from "react-router-dom";
import './SearchBar.css'

const SearchBar = () => {
    const history = useHistory();
    const [query, setQuery] = useState("")
    const [labelStatus, setLabelStatus] = useState("search-label")

    const searchForQuizzes = () => {
        history.push(`/search/?s=${query}`)
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {

        }
    }

    return (
            <div className="search-bar-page">
                <div className="search-container">
                    <div className="search-box">
                        <input type="text"
                            onKeyDown={handleKeyDown}
                            onClick={() => setLabelStatus("search-label floating")}
                            className="search-input"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <label onClick={() => setLabelStatus("search-label floating")} className={labelStatus}>Search Sparkle</label>
                    </div>
                    <div onClick={searchForQuizzes} className="magnifying-glass">
                        <i id="search-bar-mag" className="fa-solid fa-magnifying-glass"></i>
                     </div>
                </div>
            </div>
    )


}

export default SearchBar;