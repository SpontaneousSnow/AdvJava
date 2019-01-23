import React, { Component } from "react";
import ReactDOM from "react-dom";
import Click from "./card.js";
import axios from "axios";


 export class GameGrid extends Component {
  constructor(props){
      super(props)
      this.state={
          games:[]
      }
  }
  componentDidMount(){
    let cors = 'https://cors-anywhere.herokuapp.com/';
    let url ='http://api.steampowered.com/ISteamApps/GetAppList/' +
    'v0002/?key=05935F7247A1BE871C02481F57800741&format=json';
    axios
      .get(cors+url)
      .then(response => {
        let gameArray=[];
        for(let i=1; i<=50; i++){
        let x = Math.floor(Math.random()*(70000-3));
        gameArray.push(response.data.applist.apps[x]);
        }
        this.setState({
            games:gameArray
        })
        console.log(this.state);
        
      })
      .catch(err => {
        // GET failed, log the error
        console.log(err);
      });
    }
}

class Click extends React.Component {
  constructor(props) {
    super(props);
    this.state = { likes: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ likes: this.state.likes + 1 });
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleClick.bind(this)}
        >
          Like
        </button>
        <h1>{this.state.likes}</h1>
      </div>
    );
  }
}

class Content2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="user">
        <p style={{ color: "red" }}>{`${this.props.appid} ${this.props.name}`}</p>
      </div>
    );
  }
}

export default GameGrid;
