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
    let url = "https://api-v3.igdb.com/games/"+this.props.match.params.id+"?fields=*,cover.url";
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
    let gameList = this.state.games.map(game => {
      if(game.cover===undefined || game.cover==="undefined"){
        game.cover="http://via.placeholder.com/400x400"
      }else{
        game.cover=game.cover.url
      }
      //return a generated card using the GameDetail class with the input values
      return (
        <GameDetail key={game.id} id={game.id} name={game.name} cover={game.cover} />
      ) 
    });
    //displays the input options on top of screen 
    console.log(this.props.match.params.id);
    return (
      <div className="columns is-multiline">
        {gameList}
      </div>
    );
  }
}

export default GameView;