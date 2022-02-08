import React, { useState } from "react";
import "./css/App.css";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import metronome from "./sound/metronome.wav";

function App() {
  const [pitch, setPitch] = useState<number>(80);

  let bpm = (60 * 1000) / pitch;

  const metronomeSound = new Audio(metronome);

  const [intervalID, setIntervalID] = useState<NodeJS.Timer>(
    setInterval(() => {}, 10)
  );

  const [nowPlaying, setNowPlaying] = useState<boolean>(false);

  const handlePlay = () => {
    setNowPlaying(true);
    metronomeSound.play();
    setIntervalID(
      setInterval(() => {
        metronomeSound.play();
        console.log(intervalID);
      }, bpm)
    );
  };

  const handlePause = () => {
    setNowPlaying(false);
    clearInterval(intervalID);
  };

  const handleAddPitch = () => {
    if (nowPlaying) {
      clearInterval(intervalID);
      setPitch((prevPitch) => prevPitch + 1);
      handlePlay();
    } else {
      setPitch((prevPitch) => prevPitch + 1);
    }
  };

  const handleMinusPitch = () => {
    if (nowPlaying) {
      clearInterval(intervalID);
      setPitch((prevPitch) => prevPitch - 1);
      handlePlay();
    } else {
      setPitch((prevPitch) => prevPitch - 1);
    }
  };

  return (
    <>
      <h1>{pitch}</h1>
      <div className="control">
        <AiFillPlayCircle
          size={80}
          className="button control__play"
          onClick={() => handlePlay()}
        />
        <AiFillPauseCircle
          size={80}
          className="button control__pause"
          onClick={() => handlePause()}
        />
      </div>
      <div className="speed">
        <FiMinusCircle
          size={80}
          className="button speed__minus"
          onClick={() => handleMinusPitch()}
        />
        <FiPlusCircle
          size={80}
          className="button speed__plus"
          onClick={() => handleAddPitch()}
        />
      </div>
    </>
  );
}

export default App;
