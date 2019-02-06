import React, { Component } from "react";
import axios from 'axios'
import GameCard from './GameCard';
import DropDown from './DropDown';
import SearchBar from './SearchBar';
import Slider from './Slider';

 
class Games extends Component {
    constructor(props){
      super(props);
      this.state={
          games:[],
          genresSelected: 'all',
          platformsSelected: 'all',
          sort: 'no',
          searchText: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    let cors = 'https://cors-anywhere.herokuapp.com/';
    let uKey = "c16e070142351322b1e90030d7b860ba";
    let url = "https://api-v3.igdb.com/games?fields=id,name,rating,platforms.name,genres.name,cover.url&limit=50";
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
        let x=response.data.genres
        // for(let i=0; i<x.length; i++){     
        //   console.log(response.data[i].genres[i].name)
        // }
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
      // handle both of the <select> UI elements
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    handleClick(event) {
      // handle the toggle <button>
      const name = event.target.name;
      this.setState(prevState => ({
         [name]: !prevState[name]
      }));
    }
  
    render() {
      let i=0;
    const gameData = this.state.sort === 'no' ? this.state.games : [].concat(this.state.games)
    .sort((a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });
    let genre=[];
    let platform=[];
      let gameList = gameData.map((game, index) => {
        if(game.cover===undefined || game.cover===null){
          game.cover="http://via.placeholder.com/400x400"
        }else{
          game.cover=game.cover.url
        }if(game.genres===undefined || game.genres === null){
            game.genres[i].push("All");  
        }else{
          if(genre.includes(game.genres[i].name)=== false) genre.push(game.genres[i].name);
          if(genre.includes(game.genres[i].name)=== false) game.genres.push("All");      
        }if(game.platforms===undefined || game.platforms === null){
        }else{
          if(platform.includes(game.platforms[i].name)=== false) platform.push(game.platforms[i].name);
          if(platform.includes(game.platforms[i].name)=== false) platform.push("All");   
        }
        //console.log(this.state.genresSelected)
        const genreMatch = (this.state.genresSelected === game.genres[i].name || this.state.genreSelected === '');
        const platformMatch = (this.state.platformsSelected === platform || this.state.platformSelected === 'All');
        const gameNameMatch = game.name.startsWith(this.state.searchText);
        const sliderMatch = (this.state.sliderValue === game.rating || this.state.sliderValue === 0);
        console.log(game.genres[i].name)
        //return (genreMatch&platformMatch&gameNameMatch) ? (
        return (gameNameMatch) ? (
            <GameCard key={index} id={game.id} name={game.name} cover={game.cover} />
        ) :null;
      });
      i++;
      
      return (
        <section className="section">
          <DropDown options={['All'].concat(genre)} name="genresSelected" handleChange={this.handleChange} label="Filter by genre" selected={this.state.genresSelected} />
          <DropDown options={['All'].concat(platform)} name="platformsSelected" handleChange={this.handleChange} label="Filter by platform" selected={this.state.platformsSelected} />
          <SearchBar name="searchText" label="Search by game name" value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. The Witcher"} />
          <Slider name="sliderValue" value={this.state.slider} handleChange={this.handleChange} />

          <div className="columns is-multiline">
            {gameList}
          </div>
        </section>
      );
    }
  }

export default Games;