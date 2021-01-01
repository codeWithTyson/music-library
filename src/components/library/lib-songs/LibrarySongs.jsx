import React from "react";
import { audioIsPlaying } from "../../../utils/util";

const Songs = ({
  id,
  name,
  cover,
  artist,
  songsList,
  active,
  currentSong,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const changeSongHandler = () => {
    const selectedSong = songsList.filter((song) => song.id === id);
    currentSong(selectedSong[0]);

    // Looping through each song & make them active & if it is active we make them false
    const activeState = songsList.map((song) => {
      if (song.id === id) {
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

    audioIsPlaying(isPlaying, audioRef);
  };

  return (
    <div
      className={`songs ${active && "selected"}`}
      onClick={changeSongHandler}
    >
      <img src={cover} alt="music-poster not found" />
      <div className="description">
        <h1> {name} </h1>
        <h3> {artist} </h3>
      </div>
    </div>
  );
};

export default Songs;
