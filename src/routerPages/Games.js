//import required classes
import React, { Component } from "react";
import axios from 'axios'
import GameCard from './components/cards/GameCard';
import DropDown from './components/filters/DropDown';
import SearchBar from './components/filters/SearchBar';
import Slider from './components/filters/Slider';

 
class Games extends Component {
  //create constructor 
  constructor(props){
    super(props);
    this.state={
      games:[],
      genreSelected: 'All',
      platformSelected: 'All',
      searchText: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount(){
    //url appended onto front of api url to fix CORs error when trying to access api.
    //Goes through third party webiste in order to get information
    let cors = 'https://cors-anywhere.herokuapp.com/';
    //api key
    let uKey = "c16e070142351322b1e90030d7b860ba";
    //api for games
    let url = "https://api-v3.igdb.com/games?fields=id,name,rating,platforms.name,genres.name,cover.url&limit=50";
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

  handleChange(event) {
    // Allows user to type inside of search bar
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    //sets value of name to current value in bar
    this.setState({
      [name]: value
    });
  }
  
  render() {
    let i=0;
    let genre=[];
    let platform=[];
    //Runs through all of the objects inside of games and will generate a card for each game
    //creates a unquie index as the key for each object
    //if statments check to see if a cover photo is present
    let gameList = this.state.games.map((game, index) => {
      if(!game.cover){
        game.cover=[];
        game.cover.push({url:'https://bit.ly/2GvICQs'})

      }
      //checks to see if genres is null and if it is set it to be "All"
      //if its not push the current value of genres into the array checking if they are already presnt first
      if(!game.genres){
        game.genres=[];
        game.genres.push({name:'Puzzle'})
      }else{
        if(genre.includes(game.genres[i].name)=== false) genre.push(game.genres[i].name);  
      }
      //does the same as the above if block but for platforms
      if(!game.platforms){
        game.platforms=[];
        game.platforms.push({name:'Wii U'})
      }else{
        if(platform.includes(game.platforms[i].name)=== false) platform.push(game.platforms[i].name);  
      }
      //consts declared for the purpose of filtering data
      //filtrs for games with the matching genre or platform
      const genreMatch = (this.state.genreSelected === game.genres[i].name || this.state.genreSelected === 'All');
      const platformMatch = (this.state.platformSelected === game.platforms[i].name || this.state.platformSelected === 'All');
      console.log( this.state.genreSelected);
      //filters for games with the same name as the value of the search bar
      const gameNameMatch = game.name.startsWith(this.state.searchText);
      //filters games based on rating of slider value
      const sliderMatch = (this.state.sliderValue === game.rating || this.state.sliderValue === 0);
      //if the requirements are met return a generated card using the GameCard class with the input values
      return (gameNameMatch&&genreMatch&&platformMatch) ? (
          <GameCard key={index} id={game.id} name={game.name} cover={game.cover.url} />
      ) :null;
    });
    i++;
    //displays the input options on top of screen 
    //concatinates all possible genres and platforms into options array
    //displays all of the cards inside of multiline coloumn block
    return (
      <section className="section">
        <DropDown options={['All'].concat(genre)} name="genreSelected" handleChange={this.handleChange} label="Filter by genre" selected={this.state.genreSelected} />
        <DropDown options={['All'].concat(platform)} name="platformSelected" handleChange={this.handleChange} label="Filter by platform" selected={this.state.platformSelected} />
        <SearchBar name="searchText" label="Search by game name" value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. The Witcher"} />
        <Slider name="sliderValue" value={this.state.slider} handleChange={this.handleChange} label="Rating Slider:" />
        <div className="columns is-multiline">
          {gameList}
        </div>
      </section>
    );
  }
}

export default Games;