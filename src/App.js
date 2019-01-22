import React, { Component } from 'react';
import './App.css';
import { Calendar } from './calendar/calendar';


class App extends Component {
  render() {
    return (
      <div className="calendar">
        <h1>Calendar</h1>
        <Calendar></Calendar>
      </div>
    );
  }
}

export default App;
