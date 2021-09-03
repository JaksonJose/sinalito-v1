import { useEffect, useState } from "react";
import { firestore } from "../services/firebase";


type Lessons = {
  id: number
  name: string,
  position: number,
  videoUrl: string | undefined
}

type Course = {
  Id: string
  Name: string,
  description: string,
  duration: string,
  position: number,
  lessons: Lessons[]
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
      
      snapshot.forEach((doc) => {
        list.push({
          Id: doc.id,
          Name: doc.data().name,
          description: doc.data().details,
          duration: doc.data().duration,
          position: doc.data().position,
          lessons: doc.data().lessons
        })
        
        // Sort order the array by position
        list.sort((a, b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0));

        setCourses([...list]);
      });
    }
  }

  return { courses };
}