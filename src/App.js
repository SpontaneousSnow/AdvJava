import React, { Component } from 'react';
import axios from 'axios'
import GameCard from './components/GameCard';
import GameView from './components/GameView';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./components/Home";
import Games from "./components/Games";
import Users from "./components/Users";

class App extends Component {
    
  render() {


    return (
          
          <HashRouter>
          <div>
            <h1>Simple SPA</h1>
            <ul className="header">
              <li><NavLink exact to="/">Home</NavLink>></li>
              <li><NavLink to="/games">Games</NavLink></li>
              <li><NavLink to="/users">Users</NavLink></li>
            </ul>
            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/games" component={Games}/>
                <Route path="/users" component={Users}/>
                <Route path="/game/:id" component={GameView}/>
            </div>
          </div>
        </HashRouter>
    );
  }
}

export default App;
