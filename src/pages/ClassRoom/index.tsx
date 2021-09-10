import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player/youtube';
import { Header } from '../../component/Header';
import './classroom.scss';

type Lessons = {
  id: number
  name: string,
  position: number,
  videoUrl: string | undefined
}

export function ClassRoom() {
  const lesson: any = useSelector<any>(state => state.userLesson);
  const [duration, setDuration] = useState<number>();

  const WatchedWholeVideo = (timeValue: any) => {
    const timePlayed: number = Math.trunc(timeValue.playedSeconds);

    if (duration){
      const videoDuration: number = duration - 180;

      if (timePlayed >= videoDuration){
        localStorage.setItem('timeWatched', JSON.stringify(timePlayed));
        console.log(`parabéns você assistiu ${timePlayed}`);
      }
    }
  }

  return (
    <div className="classroom-container">
      <Header />
      <div className="live-container">

        { lesson.map((item: Lessons) => (
          <div className="video-wrapper">
          <ReactPlayer width="100%" height="100%" url={item.videoUrl}
            onDuration={(time) => setDuration(time)}
            onProgress={(videoProgress) => WatchedWholeVideo(videoProgress)}
          />
          </div>
        ))
        }
      </div>
      
      {/*
      <div className="chat-container">
        <iframe src="https://www.youtube.com/live_chat?v=hSUuOrUk3NM&embed_domain=localhost"
        title="youtube chat" width="100%" height="100%" frameBorder="0"></iframe>
      </div>
      */}
  </div>   
  );
}