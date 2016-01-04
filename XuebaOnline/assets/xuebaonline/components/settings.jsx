import React from 'react'
import Header from './header'
import "../semantic.css"
import UserStore from '../stores/UserStore'

var inlineStyle = {
  paddingTop:'2 px'
};

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:UserStore.getState().user_name,
      email:UserStore.getState().email,
      credit:UserStore.getState().credit,
      realname:UserStore.getState().realname,
      creation_time:UserStore.getState().creation_time
    };
    this.onUserChange = this.onUserChange.bind(this);
  }
  onUserChange() {
    this.state.username=UserStore.getState().user_name;
    this.state.email=UserStore.getState().email;
    this.state.credit=UserStore.getState().credit;
    this.state.realname=UserStore.getState().realname;
    this.state.creation_time=UserStore.getState().creation_time;
  }
  componentDidMount() {
    UserStore.listen(this.onUserChange);
  }
  componentWillUnmount() {
    UserStore.unlisten(this.onUserChange);
  }
  render() {
    return (
      <div className="ui yellow segment">
        <h3 className="ui header">Private information</h3>
        <div className="ui two column grid">
          <div className="four wide center aligned column">
            <div className="row">
              <img id="EditProfilePicture" className="ui image" src={require("./SearchLogo.jpg")}/>
            </div>
          </div>
          <div className="eleven wide column">
            <div className="row">
              <div className="ui form">
                <div className="three fields">
                  <div className="field">
                    <label>Real Name</label>
                    <div className="ui basic label">
                      {(this.state.realname == "" || this.state.realname==" ")?'None':this.state.realname}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="ui form">
                <div className="field">
                  <label>E-mail</label>
                  <div className="ui basic label">
                    {this.state.email}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="ui form">
                <div className="field">
                  <label>Creation Date</label>
                  <div className="ui basic label">
                    {this.state.creation_time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
