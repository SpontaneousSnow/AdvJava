import React, { Component } from 'react';
import axios from 'axios'
import GameCard from './components/GameCard';
import CompanyCard from './components/CompanyCard';
import GameView from './components/GameView';
import CompanyView from './components/CompanyView';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./components/Home";
import Games from "./components/Games";
import Companies from "./components/Companies";

class App extends Component {
    
  render() {


    return (
          
          <HashRouter>
          <div>
            <h1>Simple SPA</h1>
            <ul className="header">
              <li><NavLink exact to="/">Home</NavLink>></li>
              <li><NavLink to="/games">Games</NavLink></li>
              <li><NavLink to="/companies">Companies</NavLink></li>
            </ul>
            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/games" component={Games}/>
                <Route path="/companies" component={Companies}/>
                <Route path="/game/:id" component={GameView}/>
                <Route path="/company/:id" component={CompanyView}/>
            </div>
          </div>
        </HashRouter>
    );
  }
}

export default App;
