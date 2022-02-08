import React, { useState } from "react";
import "./css/App.css";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import metronome from "./sound/metronome.wav";
import Slider from "@mui/material/Slider";
import { createTheme } from "@mui/material/";
import { cyan, green } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";

const metronomeSound = new Audio(metronome);

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: cyan[700],
      },
      secondary: {
        main: green[500],
      },
    },
  });

  const [pitch, setPitch] = useState<number>(80);
  let bpm = (60 * 1000) / pitch;

  const [intervalID, setIntervalID] = useState<NodeJS.Timer>(
    setInterval(() => {}, 10)
  );

  const [nowPlaying, setNowPlaying] = useState<boolean>(false);

  const handlePlay = (isPlaying: boolean) => {
    if (nowPlaying) return;
    setNowPlaying(true);
    metronomeSound.play();
    setIntervalID(
      setInterval(() => {
        metronomeSound.play();
      }, bpm)
    );
  };

  const handlePause = () => {
    setNowPlaying(false);
    clearInterval(intervalID);
  };

  const handleAddPitch = () => {
    setPitch((prevPitch) => prevPitch + 1);
  };

  const handleMinusPitch = () => {
    setPitch((prevPitch) => prevPitch - 1);
  };

  const handleChange = (e: any) => {
    setPitch(e.target.value);
  };

  function buttonActive() {
    if (nowPlaying) {
      return (
        <AiFillPauseCircle
          size={120}
          className="button control__button"
          onClick={() => handlePause()}
        />
      );
    } else {
      return (
        <AiFillPlayCircle
          size={120}
          className="button control__button"
          onClick={() => handlePlay(nowPlaying)}
        />
      );
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <h1 className="pitch">
          {pitch}
          <span className="pitch__bpm">BPM</span>
        </h1>
        <div className="speed">
          <FiMinusCircle
            size={80}
            className="button speed__minus"
            onClick={() => handleMinusPitch()}
          />
          <Slider
            className="speed__slider"
            value={pitch}
            onChange={handleChange}
            aria-label="Default"
            valueLabelDisplay="auto"
            min={50}
            max={250}
            sx={[
              { height: 20 },
              { ".MuiSlider-thumb": { height: 35, width: 35 } },
            ]}
          />
          <FiPlusCircle
            size={80}
            className="button speed__plus"
            onClick={() => handleAddPitch()}
          />
        </div>
        <div className="control">
          {buttonActive()}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
