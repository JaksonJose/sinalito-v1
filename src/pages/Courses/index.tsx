import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header } from '../../component/Header';
import { Button } from '../../component/Button';
import { useCourses } from '../../hookies/useCourses';
import logo from '../../assets/images/empty-questions.svg';
import Translation from '../../resources/translation.json'
import './courses.scss';

export function Courses() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { courses } = useCourses();

  //TODO: add a field to user courses which set if course is able to not.

  function HandleCourse(course: any) {   
    dispatch({
      type: "AddCourse",
      course
    })

    RedirectToLessons();
  }
  
  const RedirectToLessons = () => history.push(`/lessons`);
  
  return (
    <div className="courses-container">
      <Header />
      <div className="container">
        {courses != undefined && courses.map((course, index) => {
          return (
            <div className="card" key={index}>
              <img src={logo} alt="Foto capa do curso" />
              <div className="card-content">
                <h2>{course.name}</h2>
                <p>{Translation['Common.TotalHours']}{course.duration}</p>
                <p>{course.description}</p>
              </div>
                <Button disabled={false}
               onClick={() => HandleCourse(course.lessons)}>{Translation['Common.Access']}</Button>
            </div>
          )})
        }
    </div>
  </div>
  );
}
