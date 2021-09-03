import { Link } from 'react-router-dom';
import './notfound.scss';
import Translation from '../../resources/translation.json'

export function NotFound() {
  return(
    <div className="notfound">
      <h1>{Translation['NotFound.Status']}</h1>
      <h2>{Translation['NotFound']}</h2>
      <Link to="/">{Translation['Common.Back']}</Link>
    </div>
  )
}