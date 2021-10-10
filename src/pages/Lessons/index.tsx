import { useHistory, useParams } from "react-router-dom";
import { useCourses } from "../../hookies/useCourses";
import { FaPlay } from 'react-icons/fa';
import { Header } from "../../component/Header";
import Translation from '../../resources/translation.json';
import "./lessons.scss";

type LessonParams = {
  id: string;
}

export function Lessons(){
  const params = useParams<LessonParams>();
  const history = useHistory();
  const { courses } = useCourses();

  const courseId = params.id;

  let lessons;

  if (courses){
    let course = courses.filter(course => course.id === courseId);

    if (course) lessons = course.map(course => course.lessons);
  };

  function HandleAddLesson(id: number) {
    history.push(`/classroom/${courseId}=${id}`);
  }

  return (
    <div className="course-container">
      <Header />
      <div className="table-wrapper">
        <h2>Aulas</h2>
        <table>
          <thead>
            <tr style={{backgroundColor: 'teal', color: 'white'}}>
              <th scope="col">{Translation["Lesson.Class"]}</th>
              <th scope="col">{Translation["Lesson.Status"]}</th>
              <th scope="col">{Translation["Lesson.CompletedHours"]}</th>
              <th scope="col">{Translation["Lesson.TimeLeft"]}</th>
              <th scope="col">{Translation["Lesson.ClassEnter"]}</th>
            </tr>
          </thead>
          <tbody>
            {lessons !== undefined && lessons[0].map((lesson, index) => (
                <tr key={index} style={{backgroundColor: index % 2 === 0 ? 'white' : '#CCC'}}>
                  <td data-label={Translation["Lesson.Class"]}>{lesson.name}</td>
                  <td data-label={Translation["Lesson.Status"]}>Status</td>
                  <td data-label={Translation["Lesson.CompletedHours"]}>40 min</td>
                  <td data-label={Translation["Lesson.TimeLeft"]}>20 min</td>
                  <td data-label={Translation["Lesson.ClassEnter"]}>
                    <button className="play-btn" style={{backgroundColor: index % 2 === 0 ? 'white' : '#CCC'}}
                    onClick={() => HandleAddLesson(lesson.id)}>
                      <FaPlay />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}