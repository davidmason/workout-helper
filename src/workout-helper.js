
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
 * An inline form to add a new interval.
 *
 * handleAdd: (function(string, number)) callback to add an interval with
 *                                       a given name and number of seconds
 */
var IntervalForm = React.createClass({
  getInitialState: function () {
    return {
      collapsed: true,
      error: null
    };
  },
  expand: function (event) {
    this.setState({ collapsed: false });
  },
  handleSubmit: function (event) {
    event.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var error = null;
    if (name.length <= 0) {
        error = "The exercise has to have a name.";
    }
    var rawTime = React.findDOMNode(this.refs.time).value.trim();
    time = parseInt(rawTime);

    if (Number.isNaN(time)) {
        error = "Time must be a number of seconds.";
    }
    if (time <= 0) {
        error = "You have to do the exercise for at least 1 second.";
    }

    this.setState({ error: error });
    if (error) return;

    this.props.handleAdd(name, time);
    this.collapse();
  },
  collapse: function () {
    this.setState({ collapsed: true, error: null });
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.time).value = '';
  },
  render: function () {
    if (this.state.collapsed) {
      return (
        <div key="addbutton" className="new-interval">
          <button className="full-width" onClick={this.expand}>+</button>
        </div>
      );
    } else {
      return (
        <div className="new-interval">
          <button key="cancelbutton" onClick={this.collapse}>-</button>
          <input type="text" ref="name" placeholder="Exercise name"></input>
          <i className="fa fa-clock-o"></i>
          <input type="text" ref="time" placeholder="Seconds to exercise"></input>
          <button onClick={this.handleSubmit}>Add</button>
          {this.state.error}
        </div>
      );
    }
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
    var intervals = this.props.intervals.map(function (interval, index) {
      return _.assign({}, interval, { key: index });
    });
    return {
      intervals: intervals,
      nextKey: intervals.length
    };
  },
  addInterval: function (name, time) {
    var intervals = _.clone(this.state.intervals);
    intervals.push({
      key: this.state.nextKey,
      exercise: name,
      time: time
    });
    this.setState({
      intervals: intervals,
      nextKey: this.state.nextKey + 1
    });
  },
  render: function () {

    var intervals = this.state.intervals.map(function (interval) {
      return (
        <Interval {...interval}></Interval>
      );
    });

    return <div className="workout">
      <h1>Workout: {this.props.name}</h1>
      <ul>
        {intervals}
      </ul>
      <IntervalForm handleAdd={this.addInterval}></IntervalForm>
    </div>;
  }
});
