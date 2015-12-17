import React from 'react';
var marked = require('marked');

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.rawMarkup = this.rawMarkup.bind(this);
  }
  rawMarkup() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="comment">
        <div className="author">{this.props.author}</div>
        <div className="text" dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
}

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="ui comments">
        <h3 className="ui dividing header">Comments</h3>
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
        <form className="ui reply form">
          <div className="field">
            <textarea></textarea>
          </div>
          <div className="ui blue labeled submit icon button"><i className="icon edit"></i> Add Reply </div>
        </form>
      </div>
    );
  }
}
