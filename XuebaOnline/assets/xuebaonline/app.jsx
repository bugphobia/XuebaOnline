import React from 'react'
import ReactDOM from 'react-dom'
import Index from './components/index'
import Questions from './components/questions'
import Tuned from './components/tuned'
import UserCenter from './components/usercenter'
import FootMenu from './components/footmenu'
import SearchResults from './components/searchresult'
import Register from './components/register'
import Login from './components/login'
import FeedBack from './components/feedback'
import PageStore from './stores/PageStore'
import WindowStore from './stores/WindowStore'
import ResizeActions from './actions/ResizeActions'
import UserActions from './actions/UserAction'

window.jQuery = window.$ = require('./jquery.js');
var s = require('./semantic.js');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = PageStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  handleResize(e)
  {
    ResizeActions.WindowResized(window.innerWidth,window.innerHeight);
  }
  componentDidMount() {
    PageStore.listen(this.onChange);
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    PageStore.unlisten(this.onChange);
    window.removeEventListener('resize', this.handleResize);
  }
  onChange(state) {
    this.setState(state);
    this.forceUpdate();
  }
  render() {
    if (this.state.currentPage == "index") {
      return (
        <div>
          <Index/>
          <FootMenu/>
        </div>
      );
    } else if (this.state.currentPage == "register") {
      return (
        <div>
          <Register/>
          <FootMenu/>
        </div>
      );
    } else if (this.state.currentPage == "login") {
      return (
        <div>
          <Login/>
          <FootMenu/>
        </div>
      );
    } else if (this.state.currentPage == 'questions') {
      return (
        <div>
          <Questions/>
          <FootMenu/>
        </div>
      );
    } else if (this.state.currentPage == 'searchresults') {
      return (
        <div>
          <SearchResults/>
          <FootMenu/>
        </div>
      );
    } else if (this.state.currentPage == 'feedback') {
      return (
        <div>
          <FeedBack/>
          <FootMenu/>
        </div>
      );
    } else if (this.state.currentPage == 'usercenter') {
      return (
        <div>
          <UserCenter/>
          <FootMenu/>
        </div>
      );
    } else {
      return (
        <div>
          <Tuned/>
          <FootMenu/>
        </div>
      );
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('react-app'))
