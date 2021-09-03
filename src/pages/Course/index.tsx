import { Link, useParams } from "react-router-dom";
import { FaPlay } from 'react-icons/fa';
import { Header } from "../../component/Header";
import { useAuth } from "../../hookies/useAuth";
import { useCourses } from "../../hookies/useCourses";
import Translation from '../../resources/translation.json'
import "./course.scss";

type CourseParams = {
  id: string;
}

export function Course(){
  const { id } = useParams<CourseParams>();
  const { user } = useAuth();
  const { courses } = useCourses();
       
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
            {courses.map((item) => item.lessons.map((lesson, index) => {
              return (
                <tr key={index} style={{backgroundColor: index % 2 === 0 ? 'white' : '#CCC'}}>
                  <td data-label="Aula">{lesson.name}</td>
                  <td data-label="Status">Status</td>
                  <td data-label="Horas Completas">40 min</td>
                  <td data-label="Tempo Restante">20 min</td>
                  <td data-label="Entrar Na Aula">
                    <Link to={`/classroom/${lesson.id}`}>
                      <FaPlay />
                    </Link>
                  </td>
                </tr>
              );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}