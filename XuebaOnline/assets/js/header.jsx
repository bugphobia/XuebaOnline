import React from 'react'
import "../css/semantic.css";

export default class HeaderButton extends React.Component{
  constructor() {
    super();
    this.props = {active:false}
  }
  render() {
    if (this.props.active) {
      return (
        <a className="active item" href={this.props.href}>
          {this.props.children}
        </a>
      );
    } else {
      return (<a className="item" href={this.props.href}>
          {this.props.children}
      </a>);
    }
  }
}

export default class Header extends React.Component{
  constructor() {
    super();
    this.state = {active:'home'};
  }
  goRegister()
  {
    window.location.href="/accounts/signup/";
  }
  goLogin()
  {
    window.location.href="/accounts/signin/";
  }
  render() {
    return (
      <div className="ui stackable top inverted menu">
        <div className="ui container">
          <HeaderButton active={this.state.active=="home"} href='/index/'>
            Home
          </HeaderButton>
          <HeaderButton href='/course/'>
            Course
          </HeaderButton>
          <HeaderButton href='/index/'>
            Questions 
          </HeaderButton>
          <HeaderButton href='/robot/'>
            Robot
          </HeaderButton>
          
          <div className="right item">
            <div className="ui two column very relaxed grid">
              <div className="column">
                <button className="ui inverted orange button" onClick={this.goRegister}>register</button>
              </div>
              <div className="ui inverted vertical divider"> Or </div>
              <div className="column">
                <button className="ui inverted purple button" onClick={this.goLogin}>login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
