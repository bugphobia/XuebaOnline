import React from 'react'
import Header from './header'
import "../semantic.css"
import UserStore from '../stores/UserStore'
import JumpPageActions from '../actions/JumpPageActions'
import Question from './question'
import TagStore from '../stores/TagStore'
import TagActions from '../actions/TagActions'
import UserCenterStore from '../stores/UserCenterStore'
import UserCenterActions from '../actions/UserCenterActions'
import TagPageButtons from './tagpagebuttons'
import TagCard from './tagcard'

var inlineStyle = {
  paddingTop:'2 px'
};

export default class ChooseTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state:TagStore.getState().state,
      tags:TagStore.getState().tags,
      favorite_tags:UserStore.getState().favorite_tags,
      pageNum:0
    };
    this.onTagChange = this.onTagChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }
  onTagChange(state) {
    //console.log(state);
    this.state.state=state.state;
    this.state.tags=state.tags;
    this.forceUpdate();
  }
  onUserChange(state) {
    this.state.favorite_tags=state.favorite_tags;
    this.forceUpdate();
  }
  componentDidMount() {
    UserStore.listen(this.onUserChange);
    TagStore.listen(this.onTagChange);
    TagActions.Fetch.defer(this.state.pageNum);
  }
  componentWillUnmount() {
    TagStore.unlisten(this.onTagChange);
    UserStore.unlisten(this.onUserChange);
  }
  back() {
    UserCenterActions.ActivityJumpTo("main");
  }
  nextPage() {
    this.state.pageNum++;
    TagActions.Fetch.defer(this.state.pageNum);
  }
  lastPage() {
    if (this.state.pageNum > 0) {
      this.state.pageNum--;
    }
    TagActions.Fetch.defer(this.state.pageNum);
  }
  render() {
    var cards = [];
    var i,j;
    for (i = 0; i < this.state.tags.length; i++) {
      var k = false;
      for (j = 0; j < this.state.favorite_tags.length; j++) {
        if (this.state.tags[i].tagname == this.state.favorite_tags[j].tagname) {
          k = true;
          break;
        }
      }
      cards.push(
        <TagCard like={k} tag={this.state.tags[i]} />
      );
    }
    return (
      <div>
        <div className="ui grid">
          <div className="one wide column">
            <div className="ui icon basic button" onClick={this.back}>
              <i className="arrow left icon"></i>
            </div>
          </div>
          <div className="nine wide column">
            <h1 className="header">
              Top tags
            </h1>
          </div>
          <div className="six wide column">
            <TagPageButtons nextPage={this.nextPage} lastPage={this.lastPage}/>
          </div>
        </div>
        <div className="ui very relaxed divided list">
          {cards}
        </div>
      </div>
    );
  }
}

export default class ActivityMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite_tags:UserStore.getState().favorite_tags,
    };
    this.onUserChange = this.onUserChange.bind(this);
  }
  onUserChange(state) {
    this.state.favorite_tags = state.favorite_tags;
    this.forceUpdate();
  }
  componentDidMount() {
    UserStore.listen(this.onUserChange);
  }
  componentWillUnmount() {
    UserStore.unlisten(this.onUserChange);
  }
  onAddNew() {
    UserCenterActions.ActivityJumpTo("chooseTags");
  }
  render() {
    var cards = [];
    var i;
    for (i = 0; i < this.state.favorite_tags.length; i++) {
      cards.push(
        <TagCard like={true} tag={this.state.favorite_tags[i]} />
      );
    }
    if (cards.length == 0) {
      cards.push(
        <div className="card">
          <div className="content">
            <div className="description">
              <strong> No favorite tags !</strong>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          <h3 className="ui header" style={inlineStyle}>
            <i className="tags icon"></i>
            <div className="content">
              My Tags
              <div className="ui clear icon button" onClick={this.onAddNew}>
                <i className="add icon"></i>
                Add
              </div>
            </div>
          </h3>
          <div className="ui very relaxed divided list">
            {cards}
          </div>
        </div>
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

export default class Activity extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      page:UserCenterStore.getState().activityPage
    };
    this.onUserCenterChange = this.onUserCenterChange.bind(this);
  }
  componentDidMount() {
    UserCenterStore.listen(this.onUserCenterChange);
  }
  componentWillUnmount() {
    UserCenterStore.unlisten(this.onUserCenterChange);
  }
  onUserCenterChange(state) {
    this.state.page = state.activityPage;
  }
  render() {
    if (this.state.page == "main") {
      return (<ActivityMain/>);
    } else if (this.state.page = "chooseTags"){
      return (<ChooseTags/>);
    }
  }
}
