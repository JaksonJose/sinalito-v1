import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FaPlay } from 'react-icons/fa';
import { Header } from "../../component/Header";
import Translation from '../../resources/translation.json';
import "./lessons.scss";

type Lessons = {
  id: number
  name: string,
  position: number,
  videoUrl: string | undefined
}

export function Lessons(){
  const course: any = useSelector<any>(state => state.userCourse);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const HandleAddLesson = (lesson: Lessons) => {
    dispatch({
      type: 'AddLesson',
      lesson
    });

    RedirectToClassRoom(lesson.id);
  }

  const RedirectToClassRoom = (lessonId: number) =>  history.push(`/classroom/${lessonId}`);

  return (
    <div className="course-container">
      <Header />
      <div className="table-wrapper">
        <h2>Aulas</h2>
        <table>
          <thead>
            <tr style={{backgroundColor: 'teal', color: 'white'}}>
              <th scope="col">{Translation["Course.Class"]}</th>
              <th scope="col">{Translation["Course.Status"]}</th>
              <th scope="col">{Translation["Course.Completed-Hours"]}</th>
              <th scope="col">{Translation["Course.Time-Left"]}</th>
              <th scope="col">{Translation["Course.Class-Enter"]}</th>
            </tr>
          </thead>
          <tbody>
            {course[0].map((lesson: Lessons, index: number) => (
                <tr key={index} style={{backgroundColor: index % 2 === 0 ? 'white' : '#CCC'}}>
                  <td data-label={Translation["Course.Class"]}>{lesson.name}</td>
                  <td data-label={Translation["Course.Status"]}>Status</td>
                  <td data-label={Translation["Course.Completed-Hours"]}>40 min</td>
                  <td data-label={Translation["Course.Time-Left"]}>20 min</td>
                  <td data-label={Translation["Course.Class-Enter"]}>
                    <button className="play-btn" style={{backgroundColor: index % 2 === 0 ? 'white' : '#CCC'}}
                    onClick={() => HandleAddLesson(lesson)}>
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