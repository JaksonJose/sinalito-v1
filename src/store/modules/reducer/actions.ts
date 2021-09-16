type Lesson = {
  id: number
  name: string,
  position: number,
  videoUrl: string | undefined
}


export function AddCourse(course: any){
  return {
    type: "ADDCOURSE",
    course
  }
}

export function AddLesson(lesson: Lesson){
  return {
    type: "ADDLESSON",
    lesson
  }
}