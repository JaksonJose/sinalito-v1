import { Link } from 'react-router-dom';
import './notfound.scss';

export function NotFound() {
  return(
    <div className="notfound">
      <h1>404</h1>
      <h2>Page not found.</h2>
      <Link to="/">Voltar</Link>
    </div>
  )
}