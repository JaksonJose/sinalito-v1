import { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Header } from '../../component/Header';
import './classroom.scss';

export function ClassRoom() {
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
      <aside>
        <ReactPlayer width="100%" height="100%" url="https://www.youtube.com/embed/ZTGERyAiMJs"
          onDuration={(time) => setDuration(time)}
          onProgress={(videoProgress) => WatchedWholeVideo(videoProgress)}
        />
      </aside>
      <p>{}</p>
      <div className="chat-container">
        <iframe src="https://www.youtube.com/live_chat?v=hSUuOrUk3NM&embed_domain=localhost"
        title="youtube chat" width="100%" height="100%" frameBorder="0"></iframe>
      </div>
    </div>
  </div>   
  );
}