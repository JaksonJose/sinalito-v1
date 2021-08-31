import firebase from "firebase";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Header } from "../../component/Header";
import { useAuth } from "../../hookies/useAuth";
import Translation from '../../resources/translation.json'
import "./course.scss";

type CourseParams = {
  id: string;
}

type Lessons = {
  lessonId: string,
  name: string,
  status: number,
}

const listRef = firebase.firestore().collection('users');

export function Course(){
  const history = useHistory();
  const { id } = useParams<CourseParams>();
  const [courseIndex, setCourseIndex] = useState<Lessons[]>([]);

  const { user } = useAuth();
  
  useEffect(() => {
    async function FetchCourseIndex() {
      const snapshot: firebase.firestore.DocumentData = await listRef.doc(user!.id).collection('courses').doc(id).get();

      setCourseIndex(snapshot.data().lessons)
    }

    FetchCourseIndex();
  }, [id])
      
  function RedirectToClassRoom(item: Lessons){
    history.push(`/classroom/${item.lessonId}`);
  }

  return (
    <div className="course-container">
      <Header />

      <div className="table-wrapper">
        <table>
          <thead>
            <tr style={{backgroundColor: 'teal', color: 'white'}}>
              <th scope="col">{Translation["Course.Class"]}</th>
              <th scope="col">Status</th>
              <th scope="col">Horas completas</th>
              <th scope="col">Tempo restante</th>
              <th scope="col">Entrar na aula </th>
            </tr>
          </thead>
          <tbody>
            
            {courseIndex.map((item, index) => {
              let statusLabel = '';
              switch (item.status) {
                case 0:
                  statusLabel = 'Começar';
                  break;
                case 1:
                  statusLabel = "Em andamento";
                  break;
                case 2:
                  statusLabel = "Completo";
                  break;
                default:
                  break;
              }
              return (
              <tr key={index} style={{backgroundColor: index % 2 == 0 ? 'white' : '#CCC'}}>
                <td data-label="Class">{item.name}</td>
                <td data-label="Status">{statusLabel}</td>
                <td data-label="CompletedTime">40 min</td>
                <td data-label="TimeLeft">20 min</td>
                <td data-label="TimeLeft" onClick={() => RedirectToClassRoom(item)}>Entrar</td>
             </tr>
              )})
              }
          </tbody>
        </table>
      </div>
    </div>
  )
}