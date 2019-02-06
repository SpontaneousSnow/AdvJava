//import required classes
import React, { Component } from "react";
import axios from 'axios'
import CompanyDetail from './cards/CompanyDetail';
 
class CompanyView extends Component {
  //create constructor 
  constructor(props){
    super(props)
    this.state={
      companies:[]
    }
  }

  componentDidMount(){
    //url appended onto front of api url to fix CORs error when trying to access api.
    //Goes through third party webiste in order to get information
    let cors = 'https://cors-anywhere.herokuapp.com/';
    //api key
    let uKey = "c16e070142351322b1e90030d7b860ba";
    //api for companies with the id being passed into the url from clicked company on pervious page
    let url = "https://api-v3.igdb.com/companies/"+this.props.match.params.id+"?fields=*,logo.url,developed.name";
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
          companies:response.data
      })
      console.log(this.state.companies); 
    })    
    .catch(err => {
      // GET failed, log the error
      console.log(err);
    });
  }

  render() {
    //renders a card for the selected company
    //if statments check to see if a logo photo is present
    let companyList = this.state.companies.map(company => {
      if(company.logo===undefined || company.logo==="undefined"){
        company.logo="http://via.placeholder.com/400x400"
      }else{
        company.logo=company.logo.url
      }
      //return a generated card using the CompanyDetail class with the input values

      return (
        <CompanyDetail key={company.id} id={company.id} name={company.name} description={company.description}  logo={company.logo} />
      ) 
    });
    //displays the input options on top of screen 
    console.log(this.props.match.params.id); 
    return (
      <div>
        {companyList}
    </div>
    );
  }
}

export default CompanyView;