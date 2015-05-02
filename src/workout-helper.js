
/**
 * Clock that displays a given number of seconds.
 *
 * Shows seconds if it is less than a minute, otherwise splits the display
 * into minutes and seconds.
 *
 * seconds: (integer) total time to display
 */
var Clock = React.createClass({
  render: function () {
    var seconds = parseInt(this.props.seconds, 10);
    var remainderSeconds = seconds % 60;
    var secondsDisplay = <span>
      {remainderSeconds < 10 ? '0' : null}{remainderSeconds}
    </span>;

    var minutes = Math.floor(seconds / 60);
    var minutesDisplay = null;
    if (minutes > 0) {
      minutesDisplay = <span>{minutes}:</span>
    }

    return <div className="clock">
      <i className="fa fa-clock-o"></i> {minutesDisplay}{secondsDisplay}
    </div>
  }
});

/**
 * A single interval of an exercise.
 *
 * exercise: (string) name of the exercise to perform during the interval
 * time: (integer) number of seconds to perform the exercise
 */
var Interval = React.createClass({
  render: function () {
    return <li className="interval">
      {this.props.exercise} <Clock seconds={this.props.time} />
    </li>;
  }
});

/**
 * Widget to design and run an interval training workout.
 *
 * name: optional name for the workout
 */
var WorkoutHelper = React.createClass({
  render: function () {
    return <div className="workout">
      <h1>Workout: {this.props.name}</h1>
      <ul>
        {this.props.children}
      </ul>
    </div>;
  }
});
