import React from 'react';
import Header from './header';
import "../semantic.css";

var marginDiv
{
  marginTop:'20 px'
}

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header/>
        <div id ="page" className="ui middle aligned center aligned grid">
          <div id="main">
            <h2 className="ui header">
              <i className="ui users icon"></i>
              <div className="content">
                Login
                <div className="sub header">XueOnline</div>
              </div>
            </h2>
            <form className="ui large form" action="" method="post">
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input name="username" placeholder="your user name" type="text"/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input name="password" placeholder="your password" type="password"/>
                  </div>
                </div>
                <button className="ui fluid blue submit button" type="submit">Login</button>
              </div>
            </form>
            <div className="ui icon message">
              <i className="add user icon"></i>
              <div className="content">
                <div className="header">
                  New to us?
                </div>
                <a href="/accounts/signup/">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
