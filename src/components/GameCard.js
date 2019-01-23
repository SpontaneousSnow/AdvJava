import React from "react";
import PropTypes from 'prop-types';


class GameCard extends React.Component {
  render() {
    return (
        <div className="column is-3">
        <div className="card" >
          <div className="card-image">
            <figure className="image is-4by3">
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.props.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GameCard.defaultProps = {
    name: 'name'
  };
  
  // Checks that the correct type of props are supplied:
  GameCard.propTypes = {
    name: PropTypes.string
  };

export default GameCard;
