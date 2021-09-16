import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FaPlay } from 'react-icons/fa';
import { Header } from "../../component/Header";
import { AddActivity } from "../../store/modules/reducer/actions";
import Translation from '../../resources/translation.json';
import "./lessons.scss";

type Lesson = {
  id: number
  name: string,
  position: number,
  videoUrl: string | undefined
}

export function Lessons(){
  const lessons: any = useSelector<any>(state => state.userLessons);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const HandleAddLesson = (activity: Lesson) => {
    dispatch(AddActivity(activity));

    RedirectToClassRoom();
  }

  const RedirectToClassRoom = () =>  history.push(`/classroom`);

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
            {lessons[0].map((lesson: Lesson, index: number) => (
                <tr key={index} style={{backgroundColor: index % 2 === 0 ? 'white' : '#CCC'}}>
                  <td data-label={Translation["Lesson.Class"]}>{lesson.name}</td>
                  <td data-label={Translation["Lesson.Status"]}>Status</td>
                  <td data-label={Translation["Lesson.CompletedHours"]}>40 min</td>
                  <td data-label={Translation["Lesson.TimeLeft"]}>20 min</td>
                  <td data-label={Translation["Lesson.ClassEnter"]}>
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