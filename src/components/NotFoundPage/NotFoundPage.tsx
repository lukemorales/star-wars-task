import Bg from '../../assets/space.jpg';
import './NotFoundPage.css';

const NotFoundPage = () => (
  <div className="not-found-page" style={{ backgroundImage: `url(${Bg})` }}>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
);

export default NotFoundPage;
