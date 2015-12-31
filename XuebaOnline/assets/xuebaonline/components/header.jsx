import React from 'react';
import "../semantic.css";
import UserStore from '../stores/UserStore';
import PageStore from '../stores/PageStore';
import JumpPageActions from '../actions/JumpPageActions';

export default class HeaderButton extends React.Component{
  constructor(props) {
    super(props);
    this.props = {active:false};
    this.onClicked = this.onClicked.bind(this);
  }
  onClicked() {
    JumpPageActions.JumpTo(this.props.link);
  }
  render() {
    if (this.props.active) {
      return (
        <a className="active item" onClick={this.onClicked}>
          {this.props.children}
        </a>
      );
    } else {
      return (<a className="item" onClick={this.onClicked}>
          {this.props.children}
      </a>);
    }
  }
}

export default class RealHeader extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      active: PageStore.getState().currentPage,
      isLogin:UserStore.getState().isLogin,
      user_name:UserStore.getState().user_name
    };
    this.onPageChange = this.onPageChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
  }
  componentDidMount() {
    PageStore.listen(this.onPageChange);
    UserStore.listen(this.onUserChange);
  }
  componentWillUnmount() {
    UserStore.listen(this.onUserChange);
    PageStore.unlisten(this.onPageChange);
  }
  onUserChange(state) {
    this.state.isLogin = state.isLogin;
    this.state.user_name = state.user_name;
  }
  onPageChange(state) {
    this.state = {active:PageStore.getState().currentPage};
  }
  goRegister()
  {
    JumpPageActions.JumpTo("register");
  }
  goLogin()
  {
    JumpPageActions.JumpTo("login");
  }
  render() {
    return (
      <div className="ui container">
        <HeaderButton active={this.state.active=="index"} link='index'>
          Home
        </HeaderButton>
        <HeaderButton active={this.state.active=="course"} link='course'>
          Course
        </HeaderButton>
        <HeaderButton active={this.state.active=="questions"} link='index'>
          Questions 
        </HeaderButton>
        <HeaderButton active={this.state.active=="robot"} link='robot'>
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
    );
  }
}

export default class Header extends React.Component{
  render() {
    if(this.props.needPadding != false){
      return (
        <div>
          <div className="ui stackable top inverted menu">
            <RealHeader/>
          </div>
          <div className="ui fixed stackable top inverted menu">
            <RealHeader/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="ui fixed stackable top inverted menu">
            <RealHeader/>
          </div>
        </div>
      );
    }
  }
}
