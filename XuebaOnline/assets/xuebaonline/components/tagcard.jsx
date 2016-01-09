import React from 'react'
import UserActions from '../actions/UserAction'

export default class TagCard extends React.Component {
  constructor(props) {
    super(props);
    this.like=this.like.bind(this);
    this.dislike=this.dislike.bind(this);
  }
  like() {
    UserActions.likeTag(this.props.tag.tagname);
  }
  dislike() {
    UserActions.dislikeTag(this.props.tag.tagname);
  }
  render() {
    var button;
    if (!this.props.like) {
      button = (
        <div className="ui labeled button" tabIndex="0">
          <button className="ui red button" onClick={this.like}>
            <i className="heart icon"></i>
            Like
          </button>
          <a className="ui basic red left pointing label">
            {this.props.tag.count}
          </a>
        </div>
      );
    } else {
      button = (
        <div className="ui labeled button" tabIndex="0">
          <button className="ui blue button" onClick={this.dislike}>
            <i className="heart icon"></i>
            Dislike
          </button>
          <a className="ui basic blue left pointing label">
            {this.props.tag.count}
          </a>
        </div>
      );
    }
    return (
      <div className="item">
        <div className="header">
          <h2 className="ui header">{this.props.tag.tagname}</h2>
        </div>
        <div className="content">
          <div className="description">
            <div className="ui basic segment">
              {this.props.tag.excerpt}
            </div>
          </div>
          {button}
          <div className="ui labeled button">
            <div className="ui basic blue button">
              <i className="fork icon"></i>
              Details
            </div>
          </div>
        </div>
      </div>
    );
  }
}
