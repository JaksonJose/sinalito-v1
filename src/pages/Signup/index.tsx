import { Link } from 'react-router-dom';
import illustration from '../../assets/images/illustration.svg';
import { Button } from '../../component/Button';
import Translation from '../../resources/translation.json'
import '../Signin/auth.scss';

export function Signup(){
  return(
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>{Translation['Signup.Watch-Content']}</strong>
        <p>{Translation['Signup.Receive-Your-Certificate']}</p>
      </aside>
      <main>
        <div className="main-content">
          <h2>{Translation['Signup-Register']}</h2>
          <p>{Translation['Signup.Register-Email-Password']}</p>
          <form>
            <input type="text" placeholder={Translation['Signup.Type-Valid-Email']} />
            <input type="password" placeholder={Translation['Signup.Create-Your-Password']}/>
            <Button type="submit">{Translation['Signup.Btn-Register']}</Button>
          </form>
          <p>
            {Translation['Signup.Are-You-Registered']}<Link to="/">{Translation['Common.Click-Here']}</Link>
          </p>
        </div>
      </main>
    </div>
  )
}