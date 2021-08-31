import firebase from "firebase";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlay } from 'react-icons/fa';
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
  const { id } = useParams<CourseParams>();
  const [courseIndex, setCourseIndex] = useState<Lessons[]>([]);

  const { user } = useAuth();
  
  useEffect(() => {
    async function FetchCourseIndex() {
      const snapshot: firebase.firestore.DocumentData = await listRef.doc(user!.id).collection('courses').doc(id).get();

      setCourseIndex(snapshot.data().lessons)
    }

    FetchCourseIndex();
  }, [id, user])
      
  return (
    <div className="course-container">
      <Header />
      <div className="table-wrapper">
        <h2>Aulas do Curso</h2>
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
              <tr key={index} style={{backgroundColor: index % 2 === 0 ? 'white' : '#CCC'}}>
                <td data-label="Aula">{item.name}</td>
                <td data-label="Status">{statusLabel}</td>
                <td data-label="Horas Completas">40 min</td>
                <td data-label="Tempo Restante">20 min</td>
                <td data-label="Entrar Na Aula">
                  <Link to={`/classroom/${item.lessonId}`}>
                    <FaPlay />
                  </Link>
                </td>
             </tr>
              )})
              }
          </tbody>
        </table>
      </div>
    </div>
  )
}