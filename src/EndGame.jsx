export default function EndGame(props) {
  var isHighScore = props.lastGameScore >= props.highScore;

  var onPlayAgain = function () {
    props.setScreen("playing");
  };

  return (
    <div className="flex-col">
      <h1>{isHighScore ? "NEW HIGH SCORE!" : "GAME OVER!"}</h1>
      <div className="flexbox-item">
        <h2>Final Score</h2>
        <p className="highscore">{props.lastGameScore}</p>
      </div>
      <div className="flexbox-item">
        <h3>Correct guesses</h3>
        <p>{props.correct}/10</p>
      </div>
      <div className="flexbox-item">
        <h3>Incorrect Guesses</h3>
        <p>{props.incorrect}</p>
      </div>
      <a onClick={onPlayAgain} className="button-blue">
        Play Again
      </a>
    </div>
  );
}
