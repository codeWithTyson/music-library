import React, { useState, useRef } from "react";

// Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/library/Library";
import Navigation from "./components/Nav";

// App Data
import data from "./Data";

// Custom STyle
import "./sass/app.scss";

function App() {
  // State
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(data[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);
  const [songInfo, setSongInfo] = useState({
    duration: 0,
    currentTime: 0,
    trackSongPercentage: 0,
  });

  // refernces
  const audioRef = useRef(null);

  const timeUpdateHandler = (event) => {
    const { currentTime, duration } = event.target;

    // Getting Percentages
    const currentRound = Math.round(currentTime);
    const durationRound = Math.round(duration);
    const animeTrack = Math.round((currentRound / durationRound) * 100);

    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      trackSongPercentage: animeTrack,
    });
  };

  
  const musicPlayerStyle = {
    background: `linear-gradient(to left, ${currentSong.color[0]}, ${currentSong.color[1]})`
  }
  return (
    <div className={`App ${toggleNav && "app_active"}`}>
      <Navigation toggleNav={toggleNav} setToggleNav={setToggleNav} />

      <div className="music-player" style={musicPlayerStyle}>
        <Song {...currentSong} isPlaying={isPlaying} />
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          setCurrentSong={setCurrentSong}
          songs={songs}
          setSongs={setSongs}
        />

        <Library
          songs={songs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
          toggleNav={toggleNav}
        />

        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
        ></audio>
      </div>
    </div>
  );
}

export default App;
