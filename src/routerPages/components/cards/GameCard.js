import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class GameCard extends React.Component {
  render() {
    return (
      <div className="column is-3">
      <div className="card" >
        <div className="card-image">
          <figure className="image is-4by3">
            <img alt='Profile' src={this.props.cover}></img>
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
            <Link to={`/game/${this.props.id}`}>
            <p className="title is-4">{this.props.name}</p>
            </Link>
              
              {this.props.nat ? <p className="subtitle">{this.props.nat}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>    
    );
  }
}

GameCard.defaultProps = {
    name: 'name',
    cover: 'https://bit.ly/2GvICQs',
    nat: ''
  };
  
  // Checks that the correct type of props are supplied:
  GameCard.propTypes = {
    name: PropTypes.string
  };

export default GameCard;
