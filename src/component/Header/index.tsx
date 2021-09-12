import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hookies/useAuth';
import avatar from '../../assets/images/avatar.png';
import Translation from '../../resources/translation.json'
import './header.scss';

export function Header(){
  const { user } = useAuth();

  return(
    <div className="header-container">
      <header>
        <div className="header-left">
          <h1>Sinalito</h1>
        </div>
        
        <div className="header-center">
          <Link to="/Courses">{Translation['Common.Course']}</Link>
          <Link to="/certifications">{Translation['Common.Certifications']}</Link>
          <Link to="/profile">{Translation['Header.Profile']}</Link>
        </div>
       
        <div className="header-right">
          <div>
            <img src={user?.avatar === null ? avatar : user?.avatar} alt="" />
            <button>{user ? user?.firstName.split(" ")[0] : ""}</button>
          </div>
         
          <div>
            <FaSignOutAlt />
            <span>Sair</span>
          </div> 
          
        </div>                
      </header>
    </div>  
  )
}