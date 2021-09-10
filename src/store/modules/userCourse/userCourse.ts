
export function userCourse(state = [], action: any){
  
  switch(action.type){
    case 'AddCourse':
      return [action.course];
    default:
      return state;
  }
}