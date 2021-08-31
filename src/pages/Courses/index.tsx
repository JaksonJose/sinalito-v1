import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { Header } from '../../component/Header';
import { Button } from '../../component/Button';
import log from '../../assets/images/empty-questions.svg';
import Translation from '../../resources/translation.json'
import './courses.scss';
import { useAuth } from '../../hookies/useAuth';

type Course = {
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
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [userCourses, setUserCourses] = useState<UserCourses>();

  const { user } = useAuth();
    
  useEffect(() => {
    /* Fetch all courses avaliable at platform */
    const FetchCourses = async () => {
      const snapshot = await coursesRef.get();

      UpdateListOfCourse(snapshot);
    }

     FetchCourses();

     /* Fetch all courses which is avaliable to the user  */
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
  }, [user?.id])
  
  /* Set a list of all courses avalaible in State */
  const UpdateListOfCourse = async (snapshot: firebase.firestore.QuerySnapshot) => {
    const isCollectionEmpty = snapshot.size === 0;
    
    if (!isCollectionEmpty){
      let list = Array<Course>();
      
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

        setCoursesList([...list]);
      });
    }
  }

  function RedirectTo(courseId: Course){
    history.push(`/course/${courseId.courseId}`);
  }
  
  return (
    <div className="courses-container">
      <Header />
      <div className="container">
        {coursesList.map((course, index) => {
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
