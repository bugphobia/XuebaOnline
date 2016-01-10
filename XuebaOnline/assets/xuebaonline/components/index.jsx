import React from 'react'
import Header from './header'
import TagsCloud from './tagscloud'
import TagStore from '../stores/TagStore'
import TagActions from '../actions/TagActions'
import "../semantic.css"
import '../custom.css'
import TagPageButtons from './tagpagebuttons'
import SearchActions from '../actions/SearchActions'
import SearchStore from '../stores/SearchStore'

export default class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state:TagStore.getState().state,
      tags:TagStore.getState().tags,
      pageNum:0
    };
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
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
  onTagChange(state) {
    //console.log(state);
    this.state.state=state.state;
    this.state.tags=state.tags;
    this.forceUpdate();
  }
  componentDidMount() {
    TagStore.listen(this.onTagChange);
    TagActions.Fetch.defer(this.state.pageNum);
  }
  componentWillUnmount() {
    TagStore.unlisten(this.onTagChange);
  }
  search(queryContent) {
    SearchActions.Query(queryContent);
  }
  render() {
    if (this.state.state == 'loading') {
      return (
        <div className="ui vertical loading segment">
          <br/>
          <br/>
          <br/>
        </div>
      );
    } else if (this.state.state == 'ok') {
      var tagsList = [];
      var i;
      var colorName = ['red','orange','olive','green',
                       'teal','blue','violet','purple','pink']
      for(i = 0; i < this.state.tags.length; i++) {
        tagsList.push(
          <div key={this.state.tags[i].tagname} className={colorName[i%colorName.length]+" column taglistitem"}
               onClick={this.search.bind(this,this.state.tags[i].tagname)}>
            <h3 className="ui center aligned header p animated inverted">
              {this.state.tags[i].tagname}
            </h3>
          </div>
        );
      }
      return (
        <div className="ui vertical segment">
          <div className="ui one column padded grid">
            {tagsList}
            <div className="column">
              <TagPageButtons nextPage={this.nextPage} lastPage={this.lastPage}/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui vertical segment">
          <h2 className="ui red header">Network Error</h2>
          <ul className="ui list">
            <li>Cannot connect to server!</li>
          </ul>
        </div>
      );
    }
  }
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultQuery:SearchStore.getState().query_content
    }
    this.queryContent = "";
    this.search = this.search.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }
  search() {
    SearchActions.Query(this.queryContent);
  }
  onQueryChange(event) {
    this.queryContent = event.target.value;
  }
  render() {
    return (
      <div>
        <Header/>
        <div className="ui five column divided vertically padded stackable grid">
          <div className="two wide column">
          </div>

          <div className="three wide right aligned column">
            <div className="ui vertical segment">
              
              <div className="ui card">
                <div className="content">
                  <img className="right floated mini ui image" src={require("./SearchLogo.jpg")}/>
                  <div className="header">
                    Software Engineering
                  </div>
                  <div className="meta">
                    Hojas del Verano
                  </div>
                  <div className="description">
                    Design, Development and Maintenance
                  </div>
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <div className="ui basic green button">Approve</div>
                    <div className="ui basic red button">Change</div>
                  </div>
                </div>
              </div>

              <div className="ui card">
                <div className="content">
                  <img className="right floated mini ui image" src={require("./SearchLogo.jpg")}/>
                  <div className="header">
                    Object Oriented
                  </div>
                  <div className="meta">
                    $Teamorl$
                  </div>
                  <div className="description">
                    Project with object
                  </div>
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <div className="ui basic green button">Approve</div>
                    <div className="ui basic red button">Change</div>
                  </div>
                </div>
              </div>

              <div className="ui card">
                <div className="content">
                  <img className="right floated mini ui image" src={require("./SearchLogo.jpg")}/>
                  <div className="header">
                    Software Engineering
                  </div>
                  <div className="meta">
                    Hojas del Verano
                  </div>
                  <div className="description">
                    Design, Development and Maintenance
                  </div>
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <div className="ui basic green button">Approve</div>
                    <div className="ui basic red button">Change</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="six wide middle aligned center aligned column">
            <div className="ui vertical segment">
              <TagsCloud/>
              <h2 className="ui header">
                <div className="content">
                  Search With Tags
                </div>
              </h2>
            </div>

            <div className="ui vertical segment">
              <div className="ui form">
                <div className="ui large fluid search">
                  <div className="ui icon fluid input">
                    <input className="prompt" placeholder="Search..." type="text" name="query_content" onChange={this.onQueryChange}/>
                    <i className="search icon"></i>
                  </div>
                  <div className="results"></div>
                </div>
                <div className="ui vertical segment">
                  <div className="ui blue basic button" onClick={this.search}>
                    <i className="icon tag"></i>
                    Search
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="three wide column">
            <TagList/>
          </div>

          <div className="two wide column">
          </div>
        </div>
      </div>
    );
  }
}
