import Route from './Router';
import { Switch } from 'react-router-dom';
import { Signin } from '../pages/Signin';
import { Signup } from '../pages/Signup';
import { ClassRoom } from '../pages/ClassRoom';
import { Profile } from '../pages/Profile';
import { Certifications } from '../pages/Certifications';
import { Courses } from '../pages/Courses';
import { Lessons } from '../pages/Lessons';
import { NotFound } from '../pages/NotFound';

export function Router(){
  return(
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/courses" component={Courses} isPrivate />
      <Route exact path="/lessons/:id" component={Lessons} isPrivate />
      <Route exact path="/classroom/:id" component={ClassRoom} isPrivate/>
      <Route exact path="/profile" component={Profile} isPrivate />
      <Route exact path="/certifications" component={Certifications} isPrivate />
      <Route path="*" component={NotFound} />
    </Switch>  
  );
}