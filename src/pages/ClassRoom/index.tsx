import { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Header } from '../../component/Header';
import './classroom.scss';

export function ClassRoom({content}: any) {
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
        <div className="video-wrapper">
          <ReactPlayer width="100%" height="100%" url="https://www.youtube.com/embed/D7uBWE8Gqag"
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
  </div>   
  );
}