import React from "react";

const Song = ({ cover, name, artist, isPlaying }) => {
  return (
    <div className="song-container">
      <img src={cover} className={`${isPlaying && "rotate"}`} alt="music-cover not found" />
      <h1> {name} </h1>
      <h3>{artist}</h3>
    </div>
  );
};

export default Song;
