import React from 'react'
import Header from './header'
import UserStore from '../stores/UserStore'
import UserAction from '../actions/UserAction'
import "../semantic.css"

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    var initState = UserStore.getState();
    this.state = {
      state : "ok",
      user_name : initState.user_name,
      email : initState.email,
      password : "",
      repassword : "",
      errors : initState.errors
    };
    this.onChange = this.onChange.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRepasswordChange = this.onRepasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(state) {
    console.log(state);
    this.state = {
      user_name : state.user_name,
      email : state.email,
      password : "",
      repassword : "",
      state : state.state,
      errors : state.errors
    };
    this.forceUpdate();
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
  onEmailChange(event) {
    this.state.email = event.target.value;
    this.forceUpdate();
  }
  onPasswordChange(event) {
    this.state.password = event.target.value;
    this.forceUpdate();
  }
  onRepasswordChange(event) {
    this.state.repassword = event.target.value;
    this.forceUpdate();
  }
  onSubmit(e) {
    e.preventDefault();
    var error_count = 0;
    if (this.state.user_name == "") {
      error_count++;
      this.state.errors.push("Username can not be empty!");
    }
    if (this.state.password.length <= 6) {
      error_count++;
      this.state.errors.push("Password must more than 6!");
    }
    if (this.state.repassword != this.state.password) {
      error_count++;
      this.state.errors.push("Password and repassword don't match!");
    }
    if (this.state.email == "") {
      error_count++;
      this.state.errors.push("email can not be empty!");
    }
    if (error_count == 0) {
      this.state.errors = [];
      UserAction.Register({
        username : this.state.user_name,
        password : this.state.password,
        repassword : this.state.repassword,
        email : this.state.email
      });
    } else {
      this.forceUpdate();
    }
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
        <div id="page" className="ui middle aligned center aligned grid">
          <div id ="main"  style={pad}>
            <h2 className="ui header">
              <i className="user add icon"></i>
              <div className="content">
                Create a new account
                <div className="sub header">XuebaOnline</div>
              </div>
            </h2>
            <form className="ui error large form" onSubmit={this.onSubmit}>
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input name="username" type="text" value={this.state.user_name} placeholder="Your Username" onChange={this.onUserNameChange}/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail icon"></i>
                    <input name="email" type="text" value={this.state.email} placeholder="Your E-mail Address"  onChange={this.onEmailChange}/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input name="password" type="password" value={this.state.password} placeholder="Your Password" onChange={this.onPasswordChange}/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input name="repassword" type="password" value={this.state.repassword} placeholder="Confirm The Password" onChange={this.onRepasswordChange}/>
                  </div>
                </div>
                <button className="ui fluid large green submit button" onClick={this.onSubmit}>Create</button>
              </div>
              
              <div className="ui error message">
                {backendErrors}
              </div>
            </form>
            <div className="ui message">
              Already have an account? <a href="/accounts/signin/">Log In</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
