import { useEffect, useState } from "react";
import { firestore } from "../services/firebase";
import { useAuth } from "./useAuth";

type Course = {
  courseId: string
  courseName: string;
  description: string;
  courseDuration: string;
  position: number;
}

const coursesRef = firestore.collection('courses');

export function useCourses(){
  const [courses, setCourses] = useState<Course[]>([]);
  
    useEffect(() => {
       FetchAllCourses();

    }, [])

     /* Fetch all courses avaliable in platform */
  const FetchAllCourses = async () => {
    const snapshot = await coursesRef.get();

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

        setCourses([...list]);
      });
    }
  }

  return { courses };
}