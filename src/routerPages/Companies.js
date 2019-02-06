//import required classes
import React, { Component } from "react";
import axios from 'axios'
import CompanyCard from './components/cards/CompanyCard';
import SearchBar from './components/filters/SearchBar';

 
class Companies extends Component {
  //create constructor 
  constructor(props){
    super(props)
    this.state={
      companies:[],
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
    //api for companies
    let url = "https://api-v3.igdb.com/companies?fields=*,logo.url&limit=50";
    //passing api key in header then setting state of companies array to equal the response data
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
    //Runs through all of the objects inside of companies and will generate a card for each company
    //creates a unquie index as the key for each object
    //if statments check to see if a logo photo is present
    let companyList = this.state.companies.map((company, index) => {
      if(company.logo===undefined || company.logo==="undefined"){
        company.logo="http://via.placeholder.com/400x400"
      }else{
        company.logo=company.logo.url
      }
      //filters for companies with the same name as the value of the search bar
      const companyNameMatch = company.name.startsWith(this.state.searchText);
      //if the requirements are met return a generated card using the CompanyCard class with the input values
      return (companyNameMatch) ? (
          <CompanyCard key={index} id={company.id} name={company.name} logo={company.logo} />
      ) :null;
    });
    //displays the input options on top of screen 
    //displays all of the cards inside of multiline coloumn block
    return (
      <section className="section">
        <SearchBar name="searchText" label="Search by company name" value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. CD Project Red"} />
        <div className="columns is-multiline">
          {companyList}
        </div>
      </section>
    );
  }
}

export default Companies;