import React from "react";
import "./App.css";
import PlayingGame from "./PlayingGame";
import StartScreen from "./StartScreen";
import EndGame from "./EndGame";
import useLocaStorage from "./useLocalStorage";

export default function App() {
  var [currentScreen, setScreen] = React.useState("start");
  var [highScore, setHighScore] = useLocaStorage('highscore', 0);
  var [lastGameScore, setLastGameScore] = React.useState(0);
  var [lastGameCorrect, setLastGameCorrect] = React.useState(0);
  var [lastGameIncorrect, setLastGameIncorrect] = React.useState(0);

  if (currentScreen === "start") {
    return <StartScreen highScore={highScore} setScreen={setScreen} />;
  }

  if (currentScreen === "playing") {
    return (
      <PlayingGame
        highScore={highScore}
        setScreen={setScreen}
        setHighScore={setHighScore}
        setLastGameScore={setLastGameScore}
        setLastGameCorrect={setLastGameCorrect}
        setLastGameIncorrect={setLastGameIncorrect}
      />
    );
  }

  if (currentScreen === "end") {
    return (
      <EndGame
        setScreen={setScreen}
        lastGameScore={lastGameScore}
        highScore={highScore}
        correct={lastGameCorrect}
        incorrect={lastGameIncorrect}
      />
    );
  }

  return null;
}
