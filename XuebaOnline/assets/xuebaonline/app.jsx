import React from 'react'
import ReactDOM from 'react-dom'
import Index from './components/index'
import Tuned from './components/tuned'
import Register from './components/register'
import Login from './components/login'
import PageStore from './stores/PageStore'

window.jQuery = window.$ = require('./jquery.js');
var s = require('./semantic.js');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = PageStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    PageStore.listen(this.onChange);
  }
  componentWillUnmount() {
    PageStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  render() {
    if (this.state.currentPage == "index") {
      return (
        <Index/>
      );
    } else if (this.state.currentPage == "register") {
      return (
        <Register/>
      );
    } else if (this.state.currentPage == "login") {
      return (
        <Login/>
      );
    }
    else {
      return (
        <Tuned/>
      );
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('react-app'))
