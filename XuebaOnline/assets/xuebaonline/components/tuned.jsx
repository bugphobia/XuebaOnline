import React from 'react';
import Header from './header';
import WindowStore from '../stores/WindowStore';
import JumpPageActions from '../actions/JumpPageActions';

var headerOfH1Style = {
  marginTop: '3 em',
  marginBottom: '0 em',
  fontSize: '4 em',
  fontWeight: 'normal'
};
var headerOfH2Style = {
  fontSize: '1.7em',
  fontWeight: 'normal'
};
var buttonOfTemp = {
  marginBottom: '14em'
};

export default class Tuned extends React.Component {
  constructor(props) {
    super(props);
    this.state = WindowStore.getState();
    this.handleWindowChange = this.handleWindowChange.bind(this);
  }
  handleWindowChange(state)
  {
    this.setState(state)
  }
  componentDidMount() {
    WindowStore.listen(this.handleWindowChange);
  }
  componentWillUnmount() {
    WindowStore.unlisten(this.handleWindowChange);
  }
  render() {
    var contentStyle = {
      paddingTop: (this.state.height/7*3).toString() + 'px',
      paddingBottom: (this.state.height/7*3).toString() + 'px'
    };
    return (
      <div className="pusher">
        <Header needPadding={false}/>
        <div className="ui inverted vertical masthead center aligned segment">
          <div style={contentStyle}>
            <div className="ui text container">
              <h1 className="ui inverted header" style={headerOfH1Style}>
                Search With Tags
              </h1>
              <h2 id="HeaderOfH2" style={headerOfH2Style}>Stay tuned for such function.</h2>
              <div className="ui huge primary button" id="ButtonOfTemp" onClick={() => JumpPageActions.JumpTo("index")} style={buttonOfTemp}>
                Back Home <i className="right arrow icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
