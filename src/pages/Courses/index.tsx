import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { Header } from '../../component/Header';
import { Button } from '../../component/Button';
import { ProfileModal } from '../ProfileModal';
import log from '../../assets/images/empty-questions.svg';
import Translation from '../../resources/translation.json'
import './courses.scss';
import { useAuth } from '../../hookies/useAuth';

type Courses = {
  courseId: string
  courseName: string;
  description: string;
  courseDuration: string;
  position: number;
}

type UserCourses = {
  courseId: string
}


const coursesRef = firebase.firestore().collection('courses');
const usersRef = firebase.firestore().collection('users');

export function Courses() {
  const history = useHistory();
  const [isModalOpened, setIsModalOpend] = useState<boolean>(false);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [userCourses, setUserCourses] = useState<UserCourses>();

  const { user } = useAuth();
    
  useEffect(() => {
    /* Fetch a list of courses */
    const FetchCourses = async () => {
      const snapshot = await coursesRef.get();

      UpdateListOfCourse(snapshot);
    }

     FetchCourses();

     const FetchUserCourse = async () => {
       const snapshot = await usersRef.doc(user?.id).collection('courses').get();
      
       snapshot.docs.forEach((course) => {
          const courses = {
            courseId: course.id
          }

          setUserCourses(courses);
       });
      }

     FetchUserCourse();
  }, [])
  
  /* Set a list of course in State */
  const UpdateListOfCourse = async (snapshot: firebase.firestore.QuerySnapshot) => {
    const isCollectionEmpty = snapshot.size === 0;
    
    if (!isCollectionEmpty){
      let list = Array<Courses>();
      
      snapshot.forEach(doc => {
        list.push({
          courseId: doc.id,
          courseName: doc.data().name,
          description: doc.data().details,
          courseDuration: doc.data().duration,
          position: doc.data().position
        })
        
        // Sort order the array by position
        list.sort((a, b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0));

        setCourses([...list]);
      });
    }
  }

  function RedirectTo(courseId: Courses){
    history.push(`/course/${courseId.courseId}`);
  }
  
  return (
    <div className="courses-container">
      <ProfileModal isModalOpened={isModalOpened}/>
      <Header />
      <div className="container">
        {courses.map((course, index) => {
          return (
            <div className="card" key={index}>
              <img src={log} alt="Foto capa do curso" />
              <div className="card-content">
                <h2>{course.courseName}</h2>
                <p>{Translation['Common.TotalHours']}{course.courseDuration}</p>
                <p>{course.description}</p>
              </div>
              <Button disabled={course.courseId === userCourses?.courseId ? false : true}
               onClick={() => RedirectTo(course)}>{Translation['Common.Access']}</Button>
            </div>
          )})
        }
    </div>
  </div>
  );
}
