import React from "react";
import PropTypes from 'prop-types';

class CompanyDetail extends React.Component {
  render() {
    return (
      <div className="card" >
        <div >
          <img margin="0px" height="100" width="100" alt='Profile' src={this.props.logo}></img>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{this.props.name}</p>
              {this.props.description ? <p className="subtitle">{this.props.description}</p> : null}
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

CompanyDetail.defaultProps = {
    name: 'name',
    logo: 'http://via.placeholder.com/400x400',
    description: 'description'
  };
  
  // Checks that the correct type of props are supplied:
  CompanyDetail.propTypes = {
    name: PropTypes.string
  };

export default CompanyDetail;
