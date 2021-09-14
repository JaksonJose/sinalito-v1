import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../../component/Header';
import { Chat } from '../../component/Chat';
import ReactPlayer from 'react-player/youtube';
import './classroom.scss';

export function ClassRoom() {
  const lesson: any = useSelector<any>(state => state.userLesson);
  const [duration, setDuration] = useState<number>();

  // Destructure object into array
  //const [{videoUrl}] = lesson;

  // TODO: Register the time watched in user db when user stop to watch the video.
  // Do not regiter every second of video in the db.
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