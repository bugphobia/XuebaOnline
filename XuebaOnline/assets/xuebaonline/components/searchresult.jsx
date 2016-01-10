import React from 'react'
import Header from './header'
import SearchStore from '../stores/SearchStore'
import Question from './question'
import SearchActions from '../actions/SearchActions'

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query_content:SearchStore.getState().query_content,
      numFound:SearchStore.getState().numFound,
      question_list:SearchStore.getState().question_list
    };
    this.queryContent = "";
    this.search = this.search.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  search() {
    SearchActions.Query(this.queryContent);
  }
  onQueryChange(event) {
    this.queryContent = event.target.value;
  }
  onSearchChange(state) {
    this.state.query_content = state.query_content;
    this.state.numFound = state.numFound;
    this.state.question_list = state.question_list;
  }
  componentDidMount() {
    SearchStore.listen(this.onSearchChange);
  }
  componentWillUnmount() {
    SearchStore.unlisten(this.onSearchChange);
  }
  render() {
    var results;
    if (this.state.question_list.length > 0) {
      var i;
      results = [];
      for(i = 0; i < this.state.question_list.length; ++i) {
        results.push(
          <Question key={i}
                    title={this.state.question_list[i].title}
                    views={this.state.question_list[i].view_count}/>
        );
      }
    } else {
      results = (
          <div className="ui segment">
            No Results
          </div>
      );
    }
    return (
      <div>
        <Header/>
        <div className="ui container">
          <div className="ui grid">
            <div className="one wide column"></div>
            <div className="eleven wide column">
              <div className="ui vertical segment">
                <div className="ui fluid search">
                  <div className="ui icon fluid input">
                    <input className="prompt" placeholder="Search..." type="text" onChange={this.onQueryChange} />
                    <i className="search icon"></i>
                  </div>
                  <div className="results"></div>
                </div>
              </div>
            </div>
            <div className="four wide middle aligned column">
              <button className="ui blue basic button" onClick={this.search}>
                <i className="icon tag"></i>
                Search
              </button>
            </div>
          </div>

          <div className="ui horizontal divider">
            <i className="cubes icon"></i>
          </div>

          <div className="ui items">
              {results}
              <div className="ui divider"></div>
          </div>
        </div>
      </div>
    );
  }
}
