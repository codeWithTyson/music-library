import React from "react";
import Songs from "./lib-songs/LibrarySongs";

const library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, toggleNav }) => {
  return (
    <div className={`library ${toggleNav && 'active-lib' }`}>
      <h1 className="title">Library</h1>
      {songs.map((song) => {
        return (
          <Songs
            {...song}
            key={song.id}
            songsList={songs}
            currentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        );
      })}
    </div>
  );
};

export default library;
