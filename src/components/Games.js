import React, { Component } from "react";
import axios from 'axios'
import GameCard from './GameCard';
import DropDown from './DropDown';
import SearchBar from './SearchBar';

 
class Games extends Component {
    constructor(props){
      super(props)
      this.state={
          games:[],
          genresSelected: 'All',
          platformsSelected: 'All',
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
        for(let i=0; i<49; i++){
        console.log(response.data.genres[i].name)
      }
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

    const gameData = this.state.sort === 'no' ? this.state.games : [].concat(this.state.games)
    .sort((a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });

  
      let gameList = gameData.map(game => {
        const genreMatch = (this.state.genresSelected === game.genres || this.state.genreSelected === 'All');
        const platformMatch = (this.state.platformsSelected === game.platforms || this.state.platformSelected === 'All');
        const gameNameMatch = game.name.startsWith(this.state.searchText);
        if(game.cover===undefined || game.cover==="undefined"){
          game.cover="http://via.placeholder.com/400x400"
        }else{
          game.cover=game.cover.url
        }
        //return (genreMatch&platformMatch&gameNameMatch) ? (
        return (gameNameMatch) ? (
            <GameCard key={game.id} id={game.id} name={game.name} cover={game.cover} />
        ) :null;
      });

      return (
        <section className="section">
          <DropDown options={['All','Simulator','Puzzle','Quiz/Trivia','Fighting','Tactical','Strategy','Adventure','Role-playing (RPG)','Shooter','Music','Indie']} name="genresSelected" handleChange={this.handleChange} label="Filter by genre" selected={this.state.genresSelected} />
          <DropDown options={['All','PlayStation 2','PDP-10','Windows Phone','Philips Videopac G7000','Tapwave Zodiac','Super Nintendo Entertainment System (SNES)','MSX','iOS','PlayStation','ColecoVision'].concat(this.state.platformsSelected)} name="platformsSelected" handleChange={this.handleChange} label="Filter by platform" selected={this.state.platformsSelected} />
          <SearchBar name="searchText" label="Search by game name" value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. The Witcher"} />
          <div className="columns is-multiline">
            {gameList}
          </div>
        </section>
      );
    }
  }

export default Games;