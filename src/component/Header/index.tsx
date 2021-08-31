import { Link } from 'react-router-dom';
import { useAuth } from '../../hookies/useAuth';
import avatar from '../../assets/images/avatar.png';
import Translation from '../../resources/translation.json'
import './header.scss';

export function Header(){
  const { user } = useAuth();

  return(
    <div className="header-container">
      <header>
        <h1>Sinalito</h1>
        <div className="menu">
          <Link to="/Courses">{Translation['Header.Courses']}</Link>
          <Link to="/certifications">{Translation['Header.Certifications']}</Link>
          <Link to="/profile">{Translation['Header.Profile']}</Link>
        </div>
       
        <div className="right-drop-down">
          <img src={user?.avatar === null ? avatar : user?.avatar} alt="" />
          <button>{user ? user?.firstName : ""}</button>
        </div>                 
      </header>
    </div>  
  )
}