import Bg from '../../assets/space.jpg';
import Heading from '../../components/Heading';
import './styles.css';

const NotFoundPage = () => (
  <div className="not-found-page" style={{ backgroundImage: `url(${Bg})` }}>
    <Heading as="h1">404</Heading>
    <p>Page not found</p>
  </div>
);

export default NotFoundPage;
