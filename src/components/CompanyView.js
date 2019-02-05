import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import CompanyDetail from './CompanyDetail';

 
class CompanyView extends Component {
  constructor(props){
    super(props)
    this.state={
        companies:[],
        gamePhotoId:[]
    }
}
componentDidMount(){
  let cors = 'https://cors-anywhere.herokuapp.com/';
  let uKey = "c16e070142351322b1e90030d7b860ba";
  let url = "https://api-v3.igdb.com/companies/"+this.props.match.params.id+"?fields=*,logo.url";
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
      
      let companyList = this.state.companies.map(company => {
        if(company.cover===undefined || company.cover==="undefined"){
            company.cover="http://via.placeholder.com/400x400"
        }else{
            company.cover=company.logo.url
        }
        return (
            <CompanyDetail key={company.id} id={company.id} name={company.name} logo={company.logo} />
        ) 
      });

      console.log(this.props.match.params.id);
  
      return (
        <div className="columns is-multiline">
        {companyList}
      </div>
      );
    }
  }

export default CompanyView;