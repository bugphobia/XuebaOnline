import React from 'react';
import Header from './header';
import CommentList from './comment.jsx';

export default class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header/>
        <div className="ui segment">
          <CommentList/>
        </div>
      </div>
    );
  }
}
