import React from "react";
import PropTypes from 'prop-types';

class GameDetail extends React.Component {
  render() {
    return (
      <div className="columns" > 
        <div className="column is-5 " >
          <div className="card is-vcentered is-desktop" >
              <img margin="0px" height="100" width="100" alt='Profile' src={this.props.cover}></img>
              <p className="title is-4">{this.props.name}</p>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-5">Games genres:</p>
                    {this.props.genres ? <p className="subtitle">{this.props.genres}</p> : null}
                    <p></p>
                    <p className="title is-5">Platforms:</p>
                    {this.props.platforms ? <p className="subtitle">{this.props.platforms}</p> : null}
                    <p></p>
                    <p className="title is-5">Rating:</p>
                    {this.props.rating ? <p className="subtitle">{this.props.rating}</p> : null}
                    <p></p>
                    <p className="title is-5">Description:</p>
                    {this.props.description ? <p className="subtitle">{this.props.description}</p> : null}
                  </div>
                </div>
              </div>
            </div> 
          </div>
      </div>  
    );
  }
}

GameDetail.defaultProps = {
    name: 'no name',
    cover: 'https://bit.ly/2GvICQs',
    description: 'no description',
    rating: 'no rating',
    platforms: 'no platoforms',
    genres: 'no game genres'
  };
  
  // Checks that the correct type of props are supplied:
  GameDetail.propTypes = {
    name: PropTypes.string
  };

export default GameDetail;
