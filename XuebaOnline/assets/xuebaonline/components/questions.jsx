import React from 'react'
import Header from './header'
import "../semantic.css"
import '../custom.css'
import Question from './question'
import QuestionsPageActions from '../actions/QuestionsPageActions'
import QuestionsPageStore from '../stores/QuestionsPageStore'

export default class NewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:"",
      tags:"",
      content:""
    }
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.add = this.add.bind(this);
  }
  cancel() {
    QuestionsPageActions.JumpTo('unsolved');
  }
  add() {
    QuestionsPageActions.AddQuestion({
      title:this.state.title,
      tags:this.state.tags,
      content:this.state.content
    });
    QuestionsPageActions.JumpTo('unsolved');
  }
  onTitleChange(event) {
    this.state.title=event.target.value;
  }
  onTagsChange(event) {
    this.state.tags=event.target.value;
  }
  onContentChange(event) {
    this.state.content=event.target.value;
  }
  render() {
    return (
      <div className="ui container">
        <div className="ui teal segment">
          <h2 className="ui header">New Question</h2>
          <div className="ui form">
            <div className="field">
              <label>Title</label>
              <input placeholder="Title" type="text" onChange={this.onTitleChange}/>
            </div>
            <div className="field">
              <label>Tags(split by ,)</label>
              <input placeholder="Tags" type="text" onChange={this.onTagsChange}/>
            </div>
            <div className="field">
              <label>Content</label>
              <textarea onChange={this.onContentChange}></textarea>
            </div>
            <button className="ui button" onClick={this.add}>Confirm</button>
            <button className="ui button" onClick={this.cancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default class ShowQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab:QuestionsPageStore.getState().currentTab,
      unsolvedQuestions:QuestionsPageStore.getState().unsolvedQuestions
    }
    this.onQuestionsPageStoreChange = this.onQuestionsPageStoreChange.bind(this);
  }
  onQuestionsPageStoreChange(state) {
    this.state.currentTab = state.currentTab;
    this.state.unsolvedQuestions = state.unsolvedQuestions;
    this.forceUpdate();
  }
  componentDidMount() {
    QuestionsPageStore.listen(this.onQuestionsPageStoreChange);
  }
  componentWillUnmount() {
    QuestionsPageStore.unlisten(this.onQuestionsPageStoreChange);
  }
  newQuestion() {
    QuestionsPageActions.JumpTo('new');
  }
  showSolved() {
    QuestionsPageActions.JumpTo('solved');
  }
  showUnsolved() {
    QuestionsPageActions.JumpTo('unsolved');
  }
  showMy() {
    QuestionsPageActions.JumpTo('my');
  }
  render() {
    return (
      <div>
        <div className="ui grid container">
          <div className="row">
            <div className="one wide column"></div>
            <div className="eleven wide column">
              <div className="ui vertical segment">
                <div className="ui fluid search">
                  <div className="ui icon fluid input">
                    <input className="prompt" placeholder="Search..." type="text" />
                    <i className="search icon"></i>
                  </div>
                  <div className="results"></div>
                </div>
              </div>
            </div>
            <div className="four wide middle aligned column">
              <button className="ui blue basic button">
                <i className="icon tag"></i>
                Search
              </button>
            </div>
          </div>

          <div className="ui horizontal divider">
            <i className="cubes icon"></i>
          </div>

          <div className="row">
              <div className="eleven wide stretched column">
                <div className="ui items">
                  <div className="ui two column grid">
                    <Question/>
                  </div>
                </div>
              </div>
              <div className="five wide column">
                <div className="ui button icon basic green fluid" onClick={this.newQuestion}>
                  <i className="add icon"></i>
                  New Question
                </div>
                <div className="ui vertical fluid right tabular menu">
                  <a className={this.state.currentTab=='unsolved'?
                                                       'active item':'item'}
                     onClick={this.showUnsolved}>
                    Unsolved Questions
                  </a>
                  <a className={this.state.currentTab=='solved'?
                                                       'active item':'item'}
                     onClick={this.showSolved}>
                    Solved Questions
                  </a>
                  <a className={this.state.currentTab=='my'?
                                                       'active item':'item'}
                     onClick={this.showMy}>
                    My Questions
                  </a>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab:QuestionsPageStore.getState().currentTab
    }
    this.onQuestionsPageStoreChange = this.onQuestionsPageStoreChange.bind(this);
  }
  onQuestionsPageStoreChange(state) {
    this.state.currentTab = state.currentTab;
    this.forceUpdate();
  }
  componentDidMount() {
    QuestionsPageStore.listen(this.onQuestionsPageStoreChange);
  }
  componentWillUnmount() {
    QuestionsPageStore.unlisten(this.onQuestionsPageStoreChange);
  }
  render() {
    if (this.state.currentTab == "new") {
      return (
        <div>
          <Header/>
          <NewQuestion/>
        </div>
      );
    } else {
      return (
        <div>
          <Header/>
          <ShowQuestions/>
        </div>
      );
    }
  }
}
