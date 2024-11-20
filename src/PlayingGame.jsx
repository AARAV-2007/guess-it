import React from "react";
import { moviePosterList } from "./movielist";

function getInitialArray(visible = false) {
  return Array.from({ length: 150 }, () => {
    return !visible;
  });
}

const TOTAL_ROUNDS = 10;
const TOTAL_TIME = 100;
export default function PlayingGame(props) {
  var [input, setInput] = React.useState("");
  var [movie, setMovie] = React.useState(() => {
    return moviePosterList[Math.floor(Math.random() * moviePosterList.length)];
  });
  var [score, setScore] = React.useState(0);
  var [time, setTime] = React.useState(TOTAL_TIME);
  var [correct, setCorrect] = React.useState(0);
  var [incorrect, setIncorrectCount] = React.useState(0);
  var [round, setRound] = React.useState(0);
  var [guessed, setGuessed] = React.useState(false);
  var [lastGuessIncorrect, setIncorrect] = React.useState(false);
  var [grid, setGrid] = React.useState(getInitialArray());

  var onGameOverClick = function () {
    props.setLastGameScore(score);
    if (score > props.highScore) {
      props.setHighScore(score);
    }
    props.setLastGameCorrect(correct);
    props.setLastGameIncorrect(incorrect);
    props.setScreen("end");
  };

  var onNextRoundClick = function () {
    setGrid(getInitialArray());
    setGuessed(false);
    setInput("");
    setTime(TOTAL_TIME);
    setRound(round + 1);
    setIncorrect(false);
    setMovie(
      moviePosterList[Math.floor(Math.random() * moviePosterList.length)],
    );
  };

  var onRevealClick = function () {
    setGrid(getInitialArray(true));
  };

  var onGuess = function () {
    if (input.toLowerCase() === movie.name.toLowerCase()) {
      setScore(score + time * 5);
      setGuessed(true)
      setCorrect(p => p + 1);
      setGrid(getInitialArray(true));
      setIncorrect(false);
    } else {
      setIncorrect(true);
      setIncorrectCount(p => p + 1);
      var newScore = score - 10;
      setScore(newScore < 0 ? 0 : newScore);
    }
  };

  React.useEffect(() => {
    if (!guessed) {
      let timeout = setInterval(() => {
        setTime((t) => {
          if (t <= 0) return 0;
            // set random grid
            var random = Math.floor(Math.random() * 150);
            setGrid((g) => {
              var newGrid = [...g];
              newGrid[random] = false;
              return newGrid;
            });

          return t - 1;
        });
      }, 1000);
      return () => {
        clearInterval(timeout);
      };
    }
  }, [round, guessed]);

  return (
    <div className="flex-col">
      <div className="grid-container">
        <div className="grid-item2">round</div>
        <div className="grid-item2">time left</div>
        <div className="grid-item2">score</div>
        <div className="grid-item1">{round + 1}</div>
        <div className="grid-item3">{time}</div>
        <div className="grid-item1">{score}</div>
      </div>
      <div
        className="poster"
        style={{ backgroundImage: `url('${movie.poster}')` }}
      >
        <div className="screen">
          {grid.map(function (cell, index) {
            return (
              <div className={cell ? "piece" : "hidden"} key={`${index}`} />
            );
          })}
          <div className="piece"></div>
        </div>
      </div>
      {time == 0 || guessed ? (
        <React.Fragment>
          <div>{time == 0 ? "Time up!" : "Correct!"}</div>
          {time == 0 && (
            <a onClick={onRevealClick} className="button-blue">
              Reveal answer
            </a>
          )}
          {round < TOTAL_ROUNDS - 1 && (
            <a onClick={onNextRoundClick} className="button-green">
              Next round
            </a>
          )}
        </React.Fragment>
      ) : (
        <div style={{ textAlign: "center" }}>
          {lastGuessIncorrect && "INCORRECT -10 points"}
          <br />
          Guess The Movie:
          <input
            value={input}
            className="input-box"
            onChange={(e) => {
              setInput(e.currentTarget.value);
              setIncorrect(false);
            }}
          />
          <a onClick={onGuess} className="button-blue">
            Submit
          </a>
        </div>
      )}
      {round >= TOTAL_ROUNDS - 1 && (time == 0 || guessed) && (
        <a onClick={onGameOverClick} className="button-green">
          Game Over
        </a>
      )}
    </div>
  );
}


// save highscore to local storage
  