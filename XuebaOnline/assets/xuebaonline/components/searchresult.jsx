import React from 'react'

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ui grid">
        <div className="two wide column"></div>
        <div className="nine wide column">
          <div className="row">
            <div className="ui left floated label">
              Tag's_name
            </div>
          </div>
          <div className="row">
            <div className="six wide column">
              <div className="ui container">
                <div className="ui fluid input">
                  <input type="text" placeholder="Description">
                </div>
              </div>
            </div>
            <div className="three wide column">
              <div className="row">
                <button className="ui button">
                  Like
                </button>
              </div>
              <div className="row">
                <button className="ui button">
                  Ask Question
                </button>
              </div>
              <div className="row">
                <button className="ui button">
                  Upload Search
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="ui right floated segment">
              <button className="ui button">
                Newest
              </button>
              <button className="ui button">
                Hightest voted
              </button>
              <button className="ui button">
                Unanswered
              </button>
            </div>
          </div>
          <div className="row">
            <div className="ui items">
              <div className="item">
                <div className="ui container">
                  <div className="ui center aligned segment">
                    %d
                    votes
                  </div>
                  <div className="ui center aligned segment">
                    0
                    replys
                  </div>
                  <div className="ui center aligned segment">
                    %d
                    views
                  </div>
                </div>
                <div className="ui container">
                  <div className="row">
                    <i className="tiny find icon"></i>
                    <div className="ui label">
                      Title of question
                    </div>
                  </div>
                  <div className="row">
                    <div className="ui label">
                      tag_first
                    </div>
                    <div className="ui label">
                      tag_second
                    </div>
                    <div className="ui label">
                      details
                    </div>
                  </div>
                </div>
              </div>
              {% end for%}
            </div>
          </div>
          <div className="row">
            <div className="left floated container">
              {% for i in page_numbers %}
              <button className="ui small basic icon buttons">
                {% i %}
              </button>
              {% end for %}
            </div>
            <div className="right floated container">
              <button className="ui button">
                上一页
              </button>
              <button className="ui button">
                下一页
              </button>
            </div>
          </div>
        </div>
        <div className="four wide column">
          <div className="row">
            <div className="ui center aligned segment">
              %d
              questions
            </div>
            <div className="ui center aligned segment">
              %d
              courses
            </div>
            <div className="ui center aligned segment">
              %d
              files
            </div>
          </div>
          <div className="row">
            <div className="ui segment">
              <div className="ui center aligned label">
                Related Courses
              </div>
              <div className="ui segment">
                <div className="row">
                  <div className="ui label">
                    {% Source %}
                  </div>
                  <div className="ui label">
                    {% Course title %}
                  </div>
                </div>
                <div className="row">
                  <div className="ui segment">
                    {% Course content %}
                  </div>
                </div>
                <div className="row">
                  <button className="ui left floated button">
                    Answer
                  </button>
                  <button className="ui center floated button">
                    Follow
                  </button>
                  <button className="ui right floated button">
                    Full-Screen
                  </button>
                </div>
              </div>
            </div>  
          </div>
          <div className="row">
            <div className="ui segment">
              <div className="ui center aligned label">
                Related Vedios
              </div>
              <div className="ui segment">
                <div className="row">
                  <div className="ui label">
                    {% Source %}
                  </div>
                  <div className="ui label">
                    {% Course title %}
                  </div>
                </div>
                <div className="row">
                  <div className="ui segment">
                    {% Course content %}
                  </div>
                </div>
                <div className="row">
                  <button className="ui left floated button">
                    Watch
                  </button>
                  <button className="ui right floated button">
                    Full-Screen
                  </button>
                </div>
              </div>
            </div>  
          </div>
        </div>
        <div className="one wide column"></div>
      </div>
    );
  }
}
