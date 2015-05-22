
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
    var time = this.props.time;
    var className = "interval";

    if (this.props.stage == 'prepare') {
      className += ' prepare';
      time = this.props.countdown;
    }

    if (this.props.stage == 'active') {
      className += ' active';
      time = this.props.countdown;
    }

    if (this.props.stage == 'finished') {
      className += ' finished';
    }

    return <li className={className}>
      {this.props.exercise} <Clock seconds={time} />
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
 * Simple go button that will transition to a pause button.
 *
 * handleGo: (function) callback to trigger when user indicates to start
 */
var GoButton = React.createClass({
  render: function () {
    return (
      <button className="go-button" onClick={this.props.handleGo}>
        <i className="fa fa-child"></i> Go! <i className="fa fa-play-circle"></i>
      </button>
    );
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
      return _.assign({}, interval, { key: index, stage: 'dormant' });
    });
    return {
      intervals: intervals,
      nextKey: intervals.length,
      // Properties for when the workout is running.
      running: false,
      paused: false,
      currentInterval: 0
    };
  },
  addInterval: function (name, time) {
    var intervals = _.clone(this.state.intervals);
    intervals.push({
      key: this.state.nextKey,
      exercise: name,
      time: time,
      stage: 'dormant'
    });
    this.setState({
      intervals: intervals,
      nextKey: this.state.nextKey + 1
    });
  },
  startWorkout: function () {
    if (this.state.intervals.length === 0) {
      // TODO show error in the UI
      console.error('Tried to start a workout with no intervals');
      return;
    }

    var started = this.state.running;
    var paused = started && this.state.paused;
    var alreadyRunning = started && !paused;

    if (alreadyRunning) {
      return;
    }

    if (!started) {
      var intervals = resetAllIntervals(this.state.intervals);

      // Get first interval ready
      var interval = intervals[0];

      // Start from the first interval
      this.setState({
        currentInterval: 0,
        intervals: intervals
      });
    }

    // Start or resume ticking
    this.setState({
      running: true,
      paused: false
    });

    // Make sure old interval is definitely stopped before overwriting
    // the handle.
    clearInterval(this.tickHandle);
    this.tickHandle = setInterval(this.tick, 1000);

    // TODO clock with total time display (set in initial state and
    //                                     addInterval)
    console.log(this.state.intervals.length);

    /**
     * Return intervals with all dormant.
     */
    function resetAllIntervals(intervals) {
      // Make sure all intervals are dormant
      return intervals.map(function (interval) {
        return _.assign({}, interval, { stage: 'dormant' });
      });
    }
  },
  tick: function () {
    var currentIndex = this.state.currentInterval;

    if (currentIndex >= this.state.intervals.length) {
      // No exercises left, all done.
      this.setState({
        currentInterval: 0,
        running: false,
        paused: false
      });
      clearInterval(this.tickHandle);
      this.tickHandle = null;
      return;
    }

    var intervals = _.clone(this.state.intervals);
    var current = _.clone(intervals[currentIndex]);

    // Replace old interval with clone that will be updated
    intervals[currentIndex] = current;

    console.log("current interval: %i", currentIndex);
    console.log("current stage: %s", current.stage);
    console.log("countdown: %i", current.countdown);

    switch (current.stage) {
      case 'dormant':
        prepare(current);
        break;
      case 'prepare':
        current.countdown--;
        if (current.countdown <= 0) {
          // finished prep, activate
          current.stage = 'active';
          current.countdown = current.time;
        }
        break;
      case 'active':
        current.countdown--;
        if (current.countdown <= 0) {
          current.stage = 'finished';

          var nextIndex = currentIndex + 1;
          this.setState({
            currentInterval: nextIndex
          });

          // Prepare the next interval if there is one.
          if (nextIndex < intervals.length) {
            var nextInterval = _.clone(intervals[nextIndex]);
            intervals[nextIndex] = nextInterval;
            prepare(nextInterval);
          }
        }
        break;
      case 'finished':
        console.error('Trying to continue with an exercies that is finished.');
        return;
      default:
        console.error('Unrecognized stage for interval: ' + current.stage);
        return;
    }

    this.setState({
      intervals: intervals
    });

    function prepare(interval) {
      interval.stage = 'prepare';
      interval.countdown = 5;
    }
  },
  render: function () {

    var intervals = this.state.intervals.map(function (interval) {
      return (
        <Interval {...interval}></Interval>
      );
    });

    return <div className="workout">
      <h1>Workout: {this.props.name}</h1>
      <GoButton handleGo={this.startWorkout} />
      <ul>
        {intervals}
      </ul>
      <IntervalForm handleAdd={this.addInterval}></IntervalForm>
    </div>;
  }
});
