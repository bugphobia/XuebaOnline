import React from 'react';
import Header from './header';

var headerOfH1Style = {
  marginTop: '3 em',
  marginBottom: '0 em',
  fontSize: '4 em',
  fontWeight: 'normal'
}

export default class Tuned extends React.Component {
  render() {
    return (
      <div className="pusher">
        <Header/>
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui inverted header" style={headerOfH1Style}>
              Search With Tags
            </h1>
            <h2 id="HeaderOfH2">Stay tuned for such function.</h2>
            <div className="ui huge primary button" id="ButtonOfTemp">Back Home <i className="right arrow icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
