export default function StartScreen(props) {
  var onStartGameClick = function () {
    props.setScreen("playing");
  };

  return (
    <div className="flex-col">
      <h1>Guess It!</h1>
      <div className="flexbox-item">
        <h2>
          <b>HIGHSCORE</b>
        </h2>
        <p className="highscore">{props.highScore}</p>
      </div>
      <div className="flexbox-item">
        <h3>
          <b>How to Play</b>
        </h3>
        Guess the name of the movie whose poster is displayed.
        <br />
        <br />
        The poster is revealed as time elapses. The faster you guess the name,
        the more points you receive.
      </div>
      <div className="flexbox-item">
        <h4>
          <b>Warning!</b>
        </h4>
        Incorrect guesses carry a penalty.
      </div>
      <a onClick={onStartGameClick} className="button-blue">
        Start Game{" "}
      </a>
    </div>
  );
}
