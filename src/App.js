import React, { Component } from 'react';
import GameView from './routerPages/components/GameView';
import CompanyView from './routerPages/components/CompanyView';
import './App.css';
//import router elements
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
//import router page classes
import Home from "./routerPages/Home";
import Games from "./routerPages/Games";
import Companies from "./routerPages/Companies";

class App extends Component {
  render() {
    return (   
      //create router layout   
      //naming router pages
      //linking router paths
      <HashRouter>
        <div>
          <h1>Simons IGDB Website</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
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
