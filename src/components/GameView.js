import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'

 
class GameView extends Component {
    constructor(props){
      super(props)
    
    }
  
  
    render() {
  
      console.log(this.props.match.params.id);
  
      return (
        <div className="columns is-multiline">
        
      </div>
      );
    }
  }

export default GameView;