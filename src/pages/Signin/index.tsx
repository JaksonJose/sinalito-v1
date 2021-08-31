import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hookies/useAuth';
import libras from '../../assets/images/libras.png';
import googleIconImg from '../../assets/images/google-icon.svg';
import { Button } from '../../component/Button';
import Translation from '../../resources/translation.json'
import './auth.scss';

export function Signin(){
  const { user, SignInWithGoogleAccount } = useAuth();

  /* Autenticate user and redirect */
  async function HandleGoogleAccount(){
    if(!user){
      await SignInWithGoogleAccount();
    }
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={libras} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>{Translation['Common.libras-course-online']}</strong>
        <p>{Translation['Signin.Receive-Your-Certification']}</p>
      </aside>
      <main>
        <div className="main-content">
          <button className="google-login" onClick={HandleGoogleAccount}>
            <img src={googleIconImg} alt="logo do Google" />
              {Translation['Signin.Enter-With-Google-Account']}
          </button>
          <div className="separator">{Translation['Signup.Are-You-Registered']}</div>
          <form>
            <input type="text" placeholder={Translation['Signin.Type-Your-Email']} />
            <input type="password" placeholder={Translation['Signin.Type-Your-Passoword']}/>
            <Button type="submit">{Translation['Signin.Enter']}</Button>
          </form>
          <p>{Translation['Signin.No-Have-Account']}<Link to="/signup">{Translation['Common.Click-Here']}</Link></p>
        </div>
      </main>
    </div>
  )
}