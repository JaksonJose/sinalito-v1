import { useState } from 'react';
import { useParams } from 'react-router';
import { useCourses } from '../../hookies/useCourses';
import { Header } from '../../component/Header';
import { Chat } from '../../component/Chat';
import ReactPlayer from 'react-player/youtube';
import './classroom.scss';

type Params = {
  id: string;
}

export function ClassRoom() {
  const params = useParams<Params>();
  const [duration, setDuration] = useState<number>();
  const { courses } = useCourses();

  const id = params.id;

  // TODO: Register the time watched in user db when user stop to watch the video.
  // TODO: Do not regiter every second of video in the db.
  // TODO: Logic to compare lesson id and get the videoUrl for that lesson.
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
          <ReactPlayer width="100%" height="100%" url="https://www.youtube.com/embed/ZTGERyAiMJs"
            onDuration={(time) => setDuration(time)}
            onProgress={(videoProgress) => WatchedWholeVideo(videoProgress)}
          />
          </div>
      </div>
      
      {/*
      <div className="chat-container">
        <iframe src="https://www.youtube.com/live_chat?v=hSUuOrUk3NM&embed_domain=localhost"
        title="youtube chat" width="100%" height="100%" frameBorder="0"></iframe>
      </div>
      */}

      <Chat />
  </div>   
  );
}