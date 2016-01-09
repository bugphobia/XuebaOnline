import React from 'react'
import Header from './header'
import "../semantic.css"
import UserStore from '../stores/UserStore'
import UserCenterStore from '../stores/UserCenterStore'
import JumpPageActions from '../actions/JumpPageActions'
import UserCenterActions from '../actions/UserCenterActions'
import Activity from './activity'
import Settings from './settings'

export default class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin:UserStore.getState().isLogin,
      username:UserStore.getState().user_name,
      email:UserStore.getState().email,
      credit:UserStore.getState().credit,
      realname:UserStore.getState().realname,
      currentTab:UserCenterStore.getState().currentTab
    };
    this.onUserCenterStoreChange = this.onUserCenterStoreChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
  }
  onUserCenterStoreChange() {
    this.state.currentTab = UserCenterStore.getState().currentTab;
    this.forceUpdate();
  }
  onUserChange() {
    this.state.isLogin=UserStore.getState().isLogin;
    this.state.username=UserStore.getState().user_name;
    this.state.email=UserStore.getState().email;
    this.state.credit=UserStore.getState().credit;
    this.state.realname=UserStore.getState().realname;
    if (!this.state.isLogin) {
      JumpPageActions.JumpTo.defer('login');
    }
    this.forceUpdate();
  }
  goActivity() {
    UserCenterActions.JumpTo.defer('activity');
  }
  goProfile() {
    UserCenterActions.JumpTo.defer('profile');
  }
  goSettings() {
    UserCenterActions.JumpTo.defer('settings');
  }
  componentDidMount() {
    UserCenterStore.listen(this.onUserCenterStoreChange);
    UserStore.listen(this.onUserChange);
  }
  componentWillUnmount() {
    UserStore.unlisten(this.onUserChange);
    UserCenterStore.unlisten(this.onUserCenterStoreChange);
  }
  render() {
    if (!this.state.isLogin) {
      JumpPageActions.JumpTo.defer('login');
    }
    var tab;
    if (this.state.currentTab == 'activity') {
      tab = (<Activity/>);
    } else if (this.state.currentTab == 'settings') {
      tab = (<Settings/>);
    } else {
      tab = (<p>working</p>);
    }
    return (
      <div>
        <Header/>
        <div className="ui grid container">
          <div className="four wide column">

            <div id="PictureOfCard" className="ui card">
              <div className="image">
                <img src={require("./SearchLogo.jpg")}/>
              </div>
              <div className="content">
                <p className="header">{this.state.username}</p>
                <br/>
                <p>{this.state.email}</p>
              </div>
              <div className="extra content">
                <a>
                  <i className="user icon"></i>
                  {this.state.credit} Credits
                </a>
              </div>
            </div>
            
            <div className="ui vertical fluid tabular menu">
              <a className={this.state.currentTab=='activity'?
                                                   'active item':'item'}
                 onClick={this.goActivity}>
                Activity
              </a>
              <a className={this.state.currentTab=='profile'?
                                                   'active item':'item'}
                 onClick={this.goProfile}>
                Profile
              </a>
              <a className={this.state.currentTab=='settings'?
                                                   'active item':'item'}
                 onClick={this.goSettings}>
                Settings
              </a>
            </div>
          </div>
          <div className="twelve wide stretched column">
            <div className="ui padded segment">
              {tab}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
