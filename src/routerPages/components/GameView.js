//import required classes
import React, { Component } from "react";
import axios from 'axios'
import GameDetail from './cards/GameDetail';

 
class GameView extends Component {
  //create constructor 
  constructor(props){
    super(props)
    this.state={
      games:[],
      gamePhotoId:[]
    }
  }

  componentDidMount(){
    //url appended onto front of api url to fix CORs error when trying to access api.
    //Goes through third party webiste in order to get information
    let cors = 'https://cors-anywhere.herokuapp.com/';
    //api key
    let uKey = "c16e070142351322b1e90030d7b860ba";
    //api for games with the id being passed into the url from clicked game on pervious page
    let url = "https://api-v3.igdb.com/games/"+this.props.match.params.id+"?fields=*,cover.url,rating,platforms.name,genres.name";
    //passing api key in header then setting state of games array to equal the response data
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
      this.setState({
          games:response.data
      })
      console.log(this.state.games); 
    })    
    .catch(err => {
      // GET failed, log the error
      console.log(err);
    });   
  }

  render() {
    //renders a card for the selected game
    //if statments check to see if a cover photo is present
    let gameList = this.state.games.map((game, index) => {
      if(!game.cover){
        game.cover=[];
        game.cover.push({url:'https://bit.ly/2GvICQs'})
      }
      if(!game.genres){
        game.genres=[];
        game.genres.push({name:'no genres'})
      }
      if(!game.platforms){
        game.platforms=[];
        game.platforms.push({name:'no platforms'})
      }
      //return a generated card using the GameDetail class with the input values
      return (
        <GameDetail key={index} id={game.id} name={game.name} genres={game.genres.map(n => <span>  {n.name}  </span>)} platforms={game.platforms.map(n => <span>  {n.name}  </span>)}  rating={game.rating}  cover={game.cover.url} />
      ) 
    });
    //displays the input options on top of screen 

    return (
      <div>
        {gameList}
      </div>
    );
  }
}

export default GameView;