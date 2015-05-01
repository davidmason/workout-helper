
/**
 * A single interval of an exercise.
 *
 * exercise: (string) name of the exercise to perform during the interval
 */
var Interval = React.createClass({
  render: function () {
    return <li className="interval">
      {this.props.exercise}
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
