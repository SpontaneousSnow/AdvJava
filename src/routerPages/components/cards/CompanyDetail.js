import React from "react";
import PropTypes from 'prop-types';

class CompanyDetail extends React.Component {
  render() {
    return (
      <div className="columns" > 
        <div className="column is-6 " >
          <div className="card is-vcentered is-desktop" >
              <img margin="0px" height="100" width="100" alt='Profile' src={this.props.logo}></img>
              <p className="title is-4">{this.props.name}</p>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-5">Developed Games:</p>
                    {this.props.developed ? <p className="subtitle">{this.props.developed}</p> : null}
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

CompanyDetail.defaultProps = {
    name: 'no name',
    logo: 'https://bit.ly/2GvICQs',
    description: 'no description',
    developed: 'no developed games'
  };
  
  // Checks that the correct type of props are supplied:
  CompanyDetail.propTypes = {
    name: PropTypes.string
  };

export default CompanyDetail;
