import React from 'react'
import Header from './header'
import TagsCloud from './tagscloud'
import "../semantic.css"

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              <form className="ui form" action="/search/query/" method="get">
                <div className="ui large fluid search">
                  <div className="ui icon fluid input">
                    <input className="prompt" placeholder="Search..." type="text" name="query_content"/>
                    <i className="search icon"></i>
                  </div>
                  <div className="results"></div>
                </div>
                <div className="ui vertical segment">
                  <button className="ui blue basic button submit" type="submit">
                    <i className="icon tag"></i>
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="three wide column">
            <div className="ui vertical segment">
              <div className="ui one column padded grid">
                <div className="red column">test1</div>
                <div className="blue column">test2</div>
                <div className="teal column">test3</div>
              </div>
            </div>
          </div>

          <div className="two wide column">
          </div>
        </div>
      </div>
    );
  }
}
