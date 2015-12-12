import React from 'react'
import Header from './header'
import "../semantic.css"

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header/>
        <div id="page" className="ui middle aligned center aligned grid">
          <div id ="main">
            <h2 className="ui header">
              <i className="user add icon"></i>
              <div className="content">
                Create a new account
                <div className="sub header">XuebaOnline</div>
              </div>
            </h2>
            <form className="ui large form" action="/accounts/signup/" method="post">
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="username" placeholder="Your Username"/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail icon"></i>
                    <input type="text" name="email" placeholder="Your E-mail Address"/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="password" placeholder="Your Password"/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="repassword" placeholder="Confirm The Password"/>
                  </div>
                </div>
                <div className="inline field">
                  <div className="ui checkbox">
                    <input type="checkbox" name="terms"/>
                    <label>I agree to the terms and conditions</label>
                  </div>
                </div>
                <button className="ui fluid large green submit button" type="submit">Create</button>
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
