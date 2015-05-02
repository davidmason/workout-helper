
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
 * name: (string) optional name for the workout
 * intervals: (array of { exercise, time }) list of exercises, each with
 *                                          name and how long to perform it.
 */
var WorkoutHelper = React.createClass({
  getInitialState: function () {
    return { intervals: this.props.intervals.slice() };
  },
  render: function () {

    var intervals = this.state.intervals.map(function (interval) {
      // TODO each interval should have a unique key
      return (
        <Interval {...interval}></Interval>
      );
    });

    return <div className="workout">
      <h1>Workout: {this.props.name}</h1>
      <ul>
        {intervals}
      </ul>
    </div>;
  }
});
