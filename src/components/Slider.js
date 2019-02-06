import React from 'react';

class Slider extends React.Component {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">{this.props.label}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control ">
              <input name={this.props.name} type="range" min="0" max="100" value={this.props.value} onChange={this.props.handleChange} className="slider" id="myRange" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;