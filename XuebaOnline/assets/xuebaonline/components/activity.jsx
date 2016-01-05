import React from 'react'
import Header from './header'
import "../semantic.css"
import UserStore from '../stores/UserStore'
import JumpPageActions from '../actions/JumpPageActions'
import Question from './question'
import TagStore from '../stores/TagStore'
import TagActions from '../actions/TagActions'

var inlineStyle = {
  paddingTop:'2 px'
};

export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state:TagStore.getState().state,
      tags:TagStore.getState().tags,
      pageNum:0
    };
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
  onUserChange() {
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
    var i;
    for (i = 0; i < this.state.tags.length; i++) {
      cards.push(
        <div className="card">
          <div className="content">
            <img className="right floated mini ui image" src={require("./SearchLogo.jpg")}/>
            <div className="header">
              {this.state.tags[i].tagname}
            </div>
            <div className="description">
              {this.state.tags[i].excerpt}
            </div>
          </div>
          <div className="extra content">
            <div className="ui labeled button" tabindex="0">
              <button className="ui red button">
                <i className="heart icon"></i>
                Like
              </button>
              <a className="ui basic red left pointing label">
                {this.state.tags[i].count}
              </a>
            </div>
            <div className="ui labeled button" tabindex="0">
              <div className="ui basic blue button">
                <i className="fork icon"></i>
                Details
              </div>
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
            <div className="content">My Tags</div>
          </h3>
          <div className="ui cards">
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
