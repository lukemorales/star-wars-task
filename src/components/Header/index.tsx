import { Link, useLocation } from 'react-router-dom';
import './styles.css';

const Header = () => {
  const location = useLocation();

  return (
    <div className="app-header d-flex align-items-center">
      <img
        className="sw-logo"
        src="https://logosmarcas.net/wp-content/uploads/2020/11/Star-Wars-Emblema.png"
        alt="Star Wars"
      />

      {location.pathname !== '/' && <Link to="/">Go back home</Link>}
    </div>
  );
};

export default Header;
