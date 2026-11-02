import { Link, useNavigate, useLocation } from "react-router-dom";
import '../css/Navigation.css'

function Navigation({onCategoryChange}) {
  const navigate = useNavigate();
  const location = useLocation();
  function setCategory(category, e) {
    e.preventDefault();
    if (onCategoryChange) {
    onCategoryChange(category);
}
    const path = category === 'latest_news' ? '/' : `/${category}`;
    navigate(path);
  }
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav">
        <ul className="nav-list">
            <li>
                <button
                  onClick={(e) => setCategory('latest_news', e)}
                  className={isActive('/') ? 'active' : ''}
                >
                    Latest News
                </button>
            </li>
            <li>
                <button
                  onClick={(e) => setCategory('science_technology', e)}
                  className={isActive('/science_technology') ? 'active' : ''}
                >
                    Technology
                </button>
            </li>
            <li>
                <button
                  onClick={(e) => setCategory('politics_government', e)}
                  className={isActive('/politics_government') ? 'active' : ''}
                >
                    Politics
                </button>
            </li>
            <li>
                <button
                  onClick={(e) => setCategory('sport', e)}
                  className={isActive('/sport') ? 'active' : ''}
                >
                    Sports
                </button>
            </li>
            <li>
                <button
                  onClick={(e) => setCategory('health', e)}
                  className={isActive('/health') ? 'active' : ''}
                >
                    Health
                </button>
            </li>
            <li>
                <button
                  onClick={(e) => setCategory('society', e)}
                  className={isActive('/society') ? 'active' : ''}
                >
                    Society
                </button>
            </li>
            <li>
                <button
                  onClick={(e) => setCategory('education', e)}
                  className={isActive('/education') ? 'active' : ''}
                >
                    Education
                </button>
            </li>
            <li>
                <Link to="/search">
                  <button className={isActive('/search') ? 'active' : ''}>
                    Search News...
                  </button>
                </Link>
            </li>
            <li>
                <Link to="/favorites">
                  <button className={isActive('/favorites') ? 'active' : ''}>
                    ♥ Favorites
                  </button>
                </Link>
            </li>
        </ul>
    </nav>
  );
}

export default Navigation;
