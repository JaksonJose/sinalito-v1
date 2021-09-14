import { ReactNode } from "react";
import avatar from '../../assets/images/avatar.png';
import './question.scss';

type QuestionProps = {
  children?: ReactNode;
}

export function Question({children}: QuestionProps){
 return(
   <div className="question">
     <header className="user-info">
       <img src={avatar} alt="" />
       <span>Jakson</span>
     </header>
     <main>
       <p>Essa aula foi show!!! Libras é uma linguagem internacional??</p>
     </main>
     <footer>
       <div>{children}</div>
     </footer>
   </div>
 )
}