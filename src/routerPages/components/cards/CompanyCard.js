import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class CompanyCard extends React.Component {
  render() {
    return (
      <div className="column is-3">
      <div className="card" >
        <div className="card-image">
          <figure className="image is-4by3">
            <img alt='Profile' src={this.props.logo}></img>
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
            <Link to={`/company/${this.props.id}`}>
            <p className="title is-4">{this.props.name}</p>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>    
    );
  }
}

CompanyCard.defaultProps = {
    name: 'name',
    logo: 'https://bit.ly/2GvICQs',
    nat: ''
  };
  
  // Checks that the correct type of props are supplied:
  CompanyCard.propTypes = {
    name: PropTypes.string
  };

export default CompanyCard;
