import { useEffect, useState } from "react";
import { firestore } from "../services/firebase";
import { useAuth } from "./useAuth";

type Lessons = {
  id: number
  name: string,
  position: number,
  videoUrl: string | undefined
}

type Course = {
  id: string
  name: string,
  description: string,
  duration: string,
  position: number,
  lessons: Lessons[]
}

export function useCourses(){
  const [courses, setCourses] = useState<Course[]>();
  const { user } = useAuth();

  useEffect(() => {
       /* Fetch all courses which is avaliable to the user  */
       function GetUserCoursesFromStorage() {      
        const userData = localStorage.getItem('sinalitoUser');

        if (userData) {
          const data = JSON.parse(userData);

          setCourses(data.courses);
        }
      }
  
      GetUserCoursesFromStorage();

  }, [user!.id]);


  return { courses };
}