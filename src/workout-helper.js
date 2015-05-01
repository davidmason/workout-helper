
/**
 * Widget to design and run an interval training workout.
 *
 * name: optional name for the workout
 */
var WorkoutHelper = React.createClass({
  render: function () {
    // Just output the workout name for now, to see props working.
    return <div className="workout">
      <h1>Workout: {this.props.name}</h1>
    </div>;
  }
});
