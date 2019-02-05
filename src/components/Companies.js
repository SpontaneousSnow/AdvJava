import React, { Component } from "react";
import axios from 'axios'
import CompanyCard from './CompanyCard';
import DropDown from './DropDown';
import SearchBar from './SearchBar';

 
class Companies extends Component {
    constructor(props){
      super(props)
      this.state={
          companies:[],
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
    let url = "https://api-v3.igdb.com/companies?fields=*,logo.url&limit=50";
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
            companies:response.data
        })
        console.log(this.state.companies); 
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

    const companyData = this.state.sort === 'no' ? this.state.companies : [].concat(this.state.companies)
    .sort((a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });

      let companyList = companyData.map(company => {
        //let i=company.genres.length
        //console.log(company.genres)
        const genreMatch = (this.state.genresSelected === company.genres || this.state.genreSelected === 'All');
        const platformMatch = (this.state.platformsSelected === company.platforms || this.state.platformSelected === 'All');
        const companyNameMatch = company.name.startsWith(this.state.searchText);
        if(company.logo===undefined || company.logo==="undefined"){
          company.logo="http://via.placeholder.com/400x400"
        }else{
          company.logo=company.logo.url
        }
        //return (genreMatch&platformMatch&companyNameMatch) ? (
        return (companyNameMatch) ? (
            <CompanyCard key={company.id} id={company.id} name={company.name} logo={company.logo} />
        ) :null;
      });

      return (
        <section className="section">
          <DropDown options={['All','Simulator','Puzzle','Quiz/Trivia','Fighting','Tactical','Strategy','Adventure','Role-playing (RPG)','Shooter','Music','Indie']} name="genresSelected" handleChange={this.handleChange} label="Filter by genre" selected={this.state.genresSelected} />
          <DropDown options={['All','PlayStation 2','PDP-10','Xbox 360','PC','MAC','Playstation 3','MSX','iOS','PlayStation','ColecoVision'].concat(this.state.platformsSelected)} name="platformsSelected" handleChange={this.handleChange} label="Filter by platform" selected={this.state.platformsSelected} />
          <SearchBar name="searchText" label="Search by company name" value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. The Witcher"} />
          <div className="columns is-multiline">
            {companyList}
          </div>
        </section>
      );
    }
  }

export default Companies;