import React, { Component } from "react";
import axios from 'axios'
import GameCard from './GameCard';
import {Link} from 'react-router-dom';
 
class Games extends Component {
    constructor(props){
      super(props)
      this.state={
          games:[]
      }
  }
  componentDidMount(){
    let cors = 'https://cors-anywhere.herokuapp.com/';
    let uKey = "c16e070142351322b1e90030d7b860ba";
    let url = "https://api-v3.igdb.com/games?fields=*&limit=50";
    axios
      .get(cors+url,{
        method: 'GET',
        headers:{
        'user-key': uKey,
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
        }, 
      })
      .then(response => {
        
        // let gameArray=[];
        // for(let i=1; i<=50; i++){
        // let x = Math.floor(Math.random()*(70000-3));
        // gameArray.push(response.data.applist.apps[x]);
        // }
        // this.setState({
        //     games:gameArray
        // })
        console.log(response.data);
        
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
        <div className="columns is-multiline">
        {gameList}
      </div>
      );
    }
  }

export default Games;