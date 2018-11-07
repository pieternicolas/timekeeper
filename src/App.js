import React, { Component } from 'react';

import addMinutes from 'date-fns/add_minutes';

import differenceInMinutes from 'date-fns/difference_in_minutes';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';

import './App.css';

class App extends Component {
  state = {
    timerActive: false,
    endTimerTime: 0,
    nowTime: 0,
    lengthOfTimer: 0
  }

  handleStartTimer = () => {
    this.timer = setInterval(() => {
      this.setState({
        nowTime: new Date()
      }, () => {
        const { nowTime, endTimerTime } = this.state;
        if (differenceInMilliseconds(endTimerTime, nowTime) <= 0) {
          this.handleStopTimer();
        };
      });
    }, 1000);

    const { lengthOfTimer } = this.state;
    this.setState({
      endTimerTime: addMinutes(new Date(), lengthOfTimer),
      timerActive: true
    });
  }

  handleStopTimer = () => {
    clearInterval(this.timer);
    this.timer = undefined;
    this.setState({
      timerActive: false
    });
  }

  handleTimerLengthInput = (e) => {
    const value = parseInt(e.target.value);
    this.setState({
      lengthOfTimer: value >= 0 ? value : 0
    });
  }

  render() {
    const { lengthOfTimer, endTimerTime, nowTime, timerActive } = this.state;

    const remainingTime = differenceInMinutes(endTimerTime, nowTime);
    const remainingTimeMessage = (() => {
      if (remainingTime <= 5)
        return <span style={{ color: '#dc3545' }}>{remainingTime} minutes</span>

      else if (remainingTime <= 10)
        return <span style={{ color: '#ffc107' }}>{remainingTime} minutes</span>

      else if (remainingTime <= 15)
        return <span style={{ color: '#138496' }}>{remainingTime} minutes</span>

      else
        return <span>{remainingTime} minutes</span>
    })();

    const remainingSeconds = differenceInSeconds(endTimerTime, nowTime);

    return (
      <div className="app">
        {
          !timerActive &&
            <div>
              <input
                type="number"
                className="timer-length"
                value={lengthOfTimer}
                onChange={this.handleTimerLengthInput}
              />
              &nbsp;in minutes
            </div>
        }
        {
          timerActive &&
            <React.Fragment>
              <div className="remaining-time">
                { remainingTimeMessage }
              </div>
              <div className="remaining-seconds">
                { remainingSeconds % 60 }
              </div>
            </React.Fragment>
        }
        {
          !timerActive ?
            <button className="btn-start" onClick={this.handleStartTimer}>
              Start timer
            </button>
          :
            <button className="btn-start" onClick={this.handleStopTimer}>
              Stop timer
            </button>
        }
      </div>
    );
  }
};

export default App;