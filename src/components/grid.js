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
    let url = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/' +
    'v2/?key=05935F7247A1BE871C02481F57800741&appid=8930';
    let url1 = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=05935F7247A1BE871C02481F57800741&steamids=76561198022775527';
    axios
      .get(url1)
      .then(response => {
        // GET request was successful, store the users in state
        //this.setState({ games: response.data.game });
        console.log(response.data);

        //console.log(response.data.game.availableGameStats.achievements[20]);
      })
      .catch(err => {
        // GET failed, log the error
        console.log(err);
      });
  }

  render() {
    // const achievementList = this.state.games.map(u => (
    //   <User
    //     name={u.name.first}
    //     displayName={u.displayName.first}
    //     image={u.picture.medium}
    //     quote={u.quote}
    //   />
    // ));

    return (
      <div className="columns is-multiline">
        <p>"achievementList"</p>
      </div>);
  }
}
//ReactDOM.render(<GamerGrid />, document.getElementById("root"));
 export default GameGrid;
