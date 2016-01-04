import React from 'react'
import Header from './header'
import "../semantic.css"
import UserStore from '../stores/UserStore'
import JumpPageActions from '../actions/JumpPageActions'
import Question from './question'

var inlineStyle = {
  paddingTop:'2 px'
};

export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onUserChange = this.onUserChange.bind(this);
  }
  onUserChange() {
  }
  componentDidMount() {
    UserStore.listen(this.onUserChange);
  }
  componentWillUnmount() {
    UserStore.unlisten(this.onUserChange);
  }
  render() {
    return (
      <div>
        <div className="row">
          <h3 className="ui header" style={inlineStyle}>
            <i className="help icon"></i>
            <div className="content">My Questions</div>
          </h3>
          <div className="ui two column grid">
            <Question/>
          </div>
        </div>

        <div className="row">
          <h3 className="ui header" style={inlineStyle}>
            <i className="warning icon"></i>
            <div className="content">My Answers</div>
          </h3>
          <div className="ui two column grid">
            <Question/>
          </div>
        </div>

        <div className="row">
          <h3 className="ui header" style={inlineStyle}>
            <i className="at icon"></i>
            <div className="content">Who @ Me</div>
          </h3>
          <div className="ui two column grid">
            <Question/>
          </div>
        </div>
      </div>
    );
  }
}
