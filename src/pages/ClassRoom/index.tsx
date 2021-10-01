import { useState } from 'react';
import { useParams } from 'react-router';
import { useCourses } from '../../hookies/useCourses';
import { Header } from '../../component/Header';
import { HelpDesk } from '../../component/HelpDesk';
import ReactPlayer from 'react-player/youtube';
import './classroom.scss';

type Params = {
  id: string;
}

export function ClassRoom() {
  const { id } = useParams<Params>();
  const [duration, setDuration] = useState<number>();
  const { courses } = useCourses();

  let lesson;

   if(courses){
    const ids = id.split('=');
    const course = courses.find(course => course.id === ids[0]);

    if(course) lesson = course.lessons.find(lesson => (lesson.id).toString() === ids[1]);
  }

  // TODO: Register the time watched in user db when user stop to watch the video.
  // TODO: Do not regiter every second of video in the db.
  const WatchedWholeVideo = (timeValue: any) => {
    const timePlayed: number = Math.trunc(timeValue.playedSeconds);

    if (duration){
      const videoDuration: number = duration - 180;

      if (timePlayed >= videoDuration){
        // maybe if verifies if the time is already saved  in db do not save again.
        localStorage.setItem('timeWatched', JSON.stringify(timePlayed));
      }
    }
  }

  return (
    <div className="classroom-container">
      <Header />
      <div className="live-container">
          <div className="video-wrapper">
          <ReactPlayer width="100%" height="100%" url={lesson && lesson.videoUrl}
            onDuration={(time) => setDuration(time)}
            onProgress={(videoProgress) => WatchedWholeVideo(videoProgress)}
          />
          </div>
      </div>
      
      <HelpDesk />
  </div>   
  );
}