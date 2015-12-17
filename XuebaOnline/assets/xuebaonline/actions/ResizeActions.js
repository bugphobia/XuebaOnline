import alt from '../alt';

class ResizeActions {
  WindowResized(w,h) {
      this.dispatch({w:w,h:h});
  }
}

module.exports = alt.createActions(ResizeActions);
