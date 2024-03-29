import React, { useState } from "react";
import "./css/App.scss";
import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiFillGithub,
} from "react-icons/ai";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import metronome from "./sound/metronome.mp3";
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

  const handlePlay = () => {
    if (nowPlaying) return;
    setNowPlaying(true);
    metronomeSound.play();
    setIntervalID(
      setInterval(() => {
        metronomeSound.play();
      }, bpm)
    );
  };

  const handleReplay = () => {
    if (nowPlaying) {
      clearInterval(intervalID);
      setIntervalID(
        setInterval(() => {
          metronomeSound.play();
        }, bpm)
      );
    }
  };

  const handlePause = () => {
    setNowPlaying(false);
    clearInterval(intervalID);
  };

  const handleAddPitch = () => {
    setPitch((prevPitch) => prevPitch + 1);
    if (nowPlaying) {
      handleReplay();
    }
  };

  const handleMinusPitch = () => {
    setPitch((prevPitch) => prevPitch - 1);
    if (nowPlaying) {
      handleReplay();
    }
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
          onClick={() => handlePlay()}
        />
      );
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="body">
          <h1 className="pitch">
            {pitch}
            <span className="pitch__bpm">BPM</span>
          </h1>
          <div className="speed">
            <FiMinusCircle
              size={80}
              className="button speed__button"
              onClick={() => handleMinusPitch()}
            />
            <Slider
              className="speed__slider"
              value={pitch}
              onChange={handleChange}
              min={50}
              max={250}
              sx={[
                { height: 20 },
                { ".MuiSlider-thumb": { height: 35, width: 35 } },
              ]}
              onChangeCommitted={() => {
                handleReplay();
              }}
            />
            <FiPlusCircle
              size={80}
              className="button speed__button"
              onClick={() => handleAddPitch()}
            />
          </div>
          <div className="control">{buttonActive()}</div>
        </div>
        <footer className="footer">
          Powered by&nbsp;
          <a href="https://github.com/PPKan/metronome" target="_blank" rel="noreferrer">
          <span className="footer__icon">
            <AiFillGithub  size={25}/>
          </span>
          &nbsp;PPKan
          </a>
        </footer>
      </ThemeProvider>
    </>
  );
}

export default App;
