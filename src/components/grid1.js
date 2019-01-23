import React, { Component } from 'react'
import axios from 'axios'



export class GameGrid extends Component {
  constructor(props){
      super(props)
      this.state={
          games:[]
      }
  }
 componentDidMount(){
    let cors = 'https://cors-anywhere.herokuapp.com/';
    let url ='http://api.steampowered.com/ISteamApps/GetAppList/' +
    'v0002/?key=05935F7247A1BE871C02481F57800741&format=json';
    axios
      .get(cors+url)
      .then(response => {
        let gameArray=[];
        for(let i=1; i<=50; i++){
        let x = Math.floor(Math.random()*(70000-3));
        gameArray.push(response.data.applist.apps[x]);
        }
        this.setState({
            games:gameArray
        })
        console.log(this.state);
        
      })
      .catch(err => {
        // GET failed, log the error
        console.log(err);
      });
    }
      

    render() {
        const list = this.state.games.map( (g, i) => {
            return <Game 
            appid={g.appid}
            name={g.name}
            />;
        });
        return (
            <div className="card col-md-3">
                <div className="card-body">
                    <h3>{list}</h3>
                </div>
            </div>
        );
    }
}


class Game extends React.Component {

    render() {
      return (
        <div className="card col-md-3">
            <div className="card-body">
            <h3>{this.props.name}</h3>
            <p>{this.props.email}</p>
            </div>
        </div>
      );
    }
  }


export default GameGrid;
