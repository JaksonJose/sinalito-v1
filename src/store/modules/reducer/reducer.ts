import produce from "immer";

type Lesson = {
  id: number
  name: string,
  position: number,
  videoUrl: string | undefined
}

export function UserLessons(state: Array<Lesson> = [], action: any){
  
  switch(action.type){
    case 'ADDLESSONS':
      return produce(state, draft => {
        draft.push(action.lessons);
      });

    case 'ADDACTIVITY':
      return produce(state, draft => {
        draft.push(action.activity);
      })

    default:
      return state;
  }
}