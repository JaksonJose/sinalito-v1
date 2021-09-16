
export function userCourse(state = [], action: any){
  
  switch(action.type){
    case 'ADDCOURSE':
      return [action.course];
    default:
      return state;
  }
}