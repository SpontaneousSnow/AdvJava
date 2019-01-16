import React, { Component } from 'react';
import logo from './logo.svg';
import GameGrid from './components/grid.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameGrid/>
      </div>
    );
  }
}

export default App;
