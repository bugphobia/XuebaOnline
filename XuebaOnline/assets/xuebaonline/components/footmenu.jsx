import React from 'react';
import Header from './header';
import TagsCloud from './tagscloud';
import JumpPageActions from '../actions/JumpPageActions';
import "../semantic.css";

export default class FootMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="ui inverted vertical fixed footer segment">
        <div className="ui container">
          <div className="ui stackable inverted divided equal height stackable grid">
            <div className="three wide column">
              <h3 className="ui inverted header">About Us</h3>
              <div className="ui inverted link list">
                <a href="#" className="item" onClick={() => JumpPageActions.JumpTo("feedback")}>FeedBack</a>
                <a href="#" className="item">ReadMe</a>
              </div>
            </div>
            <div className="three wide column">
              <h4 className="ui inverted header">Connect Us</h4>
              <div className="ui inverted link list">
                <a>BugPhoiba</a>
              </div>
            </div>
            <div className="seven wide column">
              <h4 className="ui inverted header">Copyright</h4>
              <p>Copyright 2014 Contributors ,Released under the MIT license, sourced from http://opensource.org/licenses/MIT</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
