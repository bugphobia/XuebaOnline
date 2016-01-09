import React from 'react'

export default class TagPageButtons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ui buttons fluid">
        <div className="ui animated button" onClick={this.props.lastPage}>
          <div className="visible content">Former</div>
          <div className="hidden content">
            <i className="left arrow icon"></i>
          </div>
        </div>
        <div className="or"></div>
        <div className="ui animated button" onClick={this.props.nextPage}>
          <div className="visible content">Latter</div>
          <div className="hidden content">
            <i className="right arrow icon"></i>
          </div>
        </div>
      </div>
    );
  }
}
