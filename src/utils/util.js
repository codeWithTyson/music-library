export const audioIsPlaying = (isPlaying, audioRef) => {
  // Check if song is loaded or playing
  if (isPlaying) {
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioRef.current.play();
      });
    }
  }
};
