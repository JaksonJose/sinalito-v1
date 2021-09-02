import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../../component/Header';
import { Button } from '../../component/Button';
import { useCourses } from '../../hookies/useCourses';
import { useUserCourses } from '../../hookies/useUserCourses';
import log from '../../assets/images/empty-questions.svg';
import Translation from '../../resources/translation.json'
import './courses.scss';

export function Courses() {
  const history = useHistory();

  const { courses } = useCourses();
  const { userCourses } = useUserCourses();

  function RedirectTo(courseId: string){
    history.push(`/course/${courseId}`);
  }
  
  return (
    <div className="courses-container">
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
               onClick={() => RedirectTo(course.courseId)}>{Translation['Common.Access']}</Button>
            </div>
          )})
        }
    </div>
  </div>
  );
}
