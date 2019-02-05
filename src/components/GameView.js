import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import GameDetail from './GameDetail';

 
class GameView extends Component {
  constructor(props){
    super(props)
    this.state={
        games:[],
        gamePhotoId:[]
    }
}
componentDidMount(){
  let cors = 'https://cors-anywhere.herokuapp.com/';
  let uKey = "c16e070142351322b1e90030d7b860ba";
  let url = "https://api-v3.igdb.com/games/"+this.props.match.params.id+"?fields=*,cover.url";
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
      // let gamePId=[]
      // for (let i = 0; i < response.data.length; i++) {
      //   gamePId.push(response.data[i].cover)  
      // }
      // console.log(gamePId)
      // let photoUrl=[]
      // for(let i = 0 ; i<49; i++){
      //   let pUrl = "https://api-v3.igdb.com/covers/"+gamePId[i]+"?fields=url"
      //   if (gamePId[i]===undefined){
      //     photoUrl.push("http://via.placeholder.com/400x400")
      //   }else{
      //     axios
      //     .get(cors+pUrl,{
      //       method: 'GET',
      //       headers:{
      //       'user-key': uKey,
      //       'Accept' : 'application/json',
      //       'Content-Type' : 'application/json'
      //       }, 
      //     })
      //     .then(response => {
      //         photoUrl.push(response.data[0].url)      
      //     })
      //     .catch(err => {
      //       // GET failed, log the error
      //       console.log(err);
      //     });
          
      //   }
      // }  
     // console.log(photoUrl);
      // console.log(gameId);
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
      
      let gameList = this.state.games.map(game => {
        if(game.cover===undefined || game.cover==="undefined"){
          game.cover="http://via.placeholder.com/400x400"
        }else{
          game.cover=game.cover.url
        }
        return (
            <GameDetail key={game.id} id={game.id} name={game.name} cover={game.cover} />
        ) 
      });

      console.log(this.props.match.params.id);
  
      return (
        <div className="columns is-multiline">
        {gameList}
      </div>
      );
    }
  }

export default GameView;