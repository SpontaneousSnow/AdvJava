import React from "react";
import ReactDOM from "react-dom";
// Note: ensure you've installed axios with 'npm install axios'
import axios from "axios";

// 'Outer' component that will contain all the User 'cards'
class GameGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = { games: [] };
  }
  

  // Runs when component is mounted
  componentDidMount() {
    // Get data for 50 users
    let cors = 'https://cors-anywhere.herokuapp.com/';
    let url ='http://api.steampowered.com/ISteamApps/GetAppList/' +
    'v0002/?key=05935F7247A1BE871C02481F57800741&format=json';
    let url1 = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=05935F7247A1BE871C02481F57800741&steamids=76561198022775527';
    axios
      .get(cors+url)
      //.get(cors+url)
      .then(response => {
        // GET request was successful, store the users in state
        //this.setState({ games: response.data.game });
        // if(response.ok) return response.json();
        // throw new Error('Request failed.');
       // console.log(response.data);
       this.setState({games: response.data})
       console.log(response.data.applist.apps[0]);
        let gameArray=[];
        for(let i; i<=50; i++){
        gameArray.push(response.data.applist.apps[i]);
        }
        console.log(gameArray);
      })
      .catch(err => {
        // GET failed, log the error
        console.log(err);
      });
  }

  render() {
  //   const gameList = this.state.games.map(g => (
  //     <Game
  //       appid={g.applist.apps[[0]]}
  //       name={g.applist.apps[[0]]}
  //     />
  //   ));

  //   return (
  //     <div className="columns is-multiline">
  //       {gameList}
  //     </div>);
  // }
  }
}

// class Game extends React.Component{
//   render() {
//     return (
//       <div style={{'borderStyle': 'dotted'}}>
//         <h3>{this.props.appid}</h3>
//         <p>{this.props.name}</p>
//       </div>
//     );
//   }
// }

//ReactDOM.render(<GamerGrid />, document.getElementById("root"));
 export default GameGrid;
