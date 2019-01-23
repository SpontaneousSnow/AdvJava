import React, { Component } from 'react';
import axios from 'axios'
import GameCard from './components/GameCard';
import './App.css';

class App extends Component {
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
    

  render() {

    let gameList = this.state.games.map(game => {
      return (
        <GameCard key={game.appid} name={game.name} />
      ) 
    });

    return (
          <div>
            {gameList}
          </div>
    );
  }
}

export default App;
