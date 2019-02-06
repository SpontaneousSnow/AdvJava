import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class GameDetail extends React.Component {
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

GameDetail.defaultProps = {
    name: 'name',
    cover: 'http://via.placeholder.com/400x400',
    nat: ''
  };
  
  // Checks that the correct type of props are supplied:
  GameDetail.propTypes = {
    name: PropTypes.string
  };

export default GameDetail;
