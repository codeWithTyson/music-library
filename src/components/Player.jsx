import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { audioIsPlaying } from "../utils/util";

const Player = ({
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  currentSong,
  setSongs,
  isPlaying,
}) => {
  // Custom Style
  const trackStyle = {
    transform: `translate(${songInfo.trackSongPercentage}%)`,
  };
  const customBg = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  // Effects
  useEffect(() => {
    const activeState = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(activeState);
  }, [currentSong]);

  // Methods
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = (event) => {
    const sliderVal = event.target.value;
    audioRef.current.currentTime = sliderVal;
    setSongInfo({ ...songInfo, currentTime: sliderVal });
  };

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const changeSongHandler = (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === "skip-next") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }

    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        audioIsPlaying(isPlaying, audioRef);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }

    audioIsPlaying(isPlaying, audioRef);
  };

  return (
    <div className="player">
      <div className="time-controls">
        <div className="track" style={customBg}>
          <input
            type="range"
            min="0"
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div className="animate-track" style={trackStyle}></div>
        </div>
      </div>

      <div className="time-info">
        <p>{formatTime(songInfo.currentTime)}</p>
        <p>{songInfo.duration ? formatTime(songInfo.duration) : "0:00"}</p>
      </div>

      <div className="player-controls">
        <FontAwesomeIcon
          icon={faStepBackward}
          className="prev-song"
          onClick={() => changeSongHandler("skip-back")}
        />
       <i className="play-btn">
        <FontAwesomeIcon
            onClick={playSongHandler}
            icon={isPlaying ? faPause : faPlay}
          />
       </i>
        <FontAwesomeIcon
          icon={faStepForward}
          className="next-song"
          onClick={() => changeSongHandler("skip-next")}
        />
      </div>
    </div>
  );
};

export default Player;
