import React from 'react';
import Header from './header';
import UserStore from '../stores/UserStore';
import UserAction from '../actions/UserAction';
import "../semantic.css";

var marginDiv
{
  marginTop:'20 px'
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    var initState = UserStore.getState();
    this.state = {
      user_name : initState.user_name,
      password : "",
      state : initState.state,
      errors : initState.errors
    };
    this.onChange = this.onChange.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(state) {
    this.state = {
      user_name : state.user_name,
      password : "",
      state : state.state,
      errors : state.errors
    };
  }
  componentDidMount() {
    UserStore.listen(this.onChange);
  }
  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  }
  onUserNameChange(event) {
    this.state.user_name = event.target.value;
    this.forceUpdate();
  }
  onPasswordChange(event) {
    this.state.password = event.target.value;
    this.forceUpdate();
  }
  onSubmit(e) {
    e.preventDefault();
    var error_count = 0;
    if (this.state.user_name == "") {
      error_count++;
      this.state.errors.push("Username cannot be empty!");
    }
    if (this.state.password.length == "") {
      error_count++;
      this.state.errors.push("Password cannot be empty!");
    }

    UserAction.Login({
      username : this.state.user_name,
      password : this.state.password
    });
  }
  render() {
    var backendErrors = [];
    var i;
    for (i = 0; i < this.state.errors.length; i++) {
      backendErrors.push(<li key={i}>{this.state.errors[i]}</li>);
    };
    var pad = {
      paddingTop: '30 px',
      paddingBottom: '30px'
    };
    return (
      <div>
        <Header/>
        <div id ="page" className="ui middle aligned center aligned grid">
          <div id="main" style={pad}>
            <h2 className="ui header">
              <i className="ui users icon"></i>
              <div className="content">
                Login
                <div className="sub header">XueOnline</div>
              </div>
            </h2>
            <form className="ui error large form" onSubmit={this.onSubmit}>
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input value={this.state.user_name} placeholder="your user name" type="text" onChange={this.onUserNameChange}/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input value={this.state.password} placeholder="your password" type="password" onChange={this.onPasswordChange}/>
                  </div>
                </div>
                <button className="ui fluid blue submit button" type="submit">Login</button>
              </div>
              <div className="ui error message">
                {backendErrors}
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
