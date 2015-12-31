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
    this.state = {commentText:""};
    this.rawMarkup = this.rawMarkup.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
  }
  rawMarkup() {
    var rawMarkup = marked(this.state.commentText, {sanitize: true});
    return { __html: rawMarkup };
  }
  updatePreview(e) {
    this.state.commentText = e.target.value;
    this.forceUpdate();
  }
  componentDidMount() {
    $('.menu .item').tab();
  }
  render() {
    return (
      <div className="ui comments">
        <h3 className="ui dividing header">Comments</h3>
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
        <div className="ui reply form">
          <div id="commentTab" className="ui top attached tabular menu">
            <a className="item active" data-tab="write">Write</a>
            <a className="item" data-tab="preview">Preview</a>
          </div>
          <div className="ui bottom attached tab segment active" data-tab="write">
            <textarea value={this.state.commentText} onChange={this.updatePreview}></textarea>
          </div>
          <div className="ui bottom attached tab segment" data-tab="preview">
            <div className="text" dangerouslySetInnerHTML={this.rawMarkup()} />
          </div>
          <div className="ui blue labeled submit icon button"><i className="icon edit"></i> Add Reply </div>
        </div>
      </div>
    );
  }
}
