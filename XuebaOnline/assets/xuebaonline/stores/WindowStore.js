import alt from '../alt';
import ResizeActions from '../actions/ResizeActions';

class WindowStore {
  constructor() {
    this.state = {
      width:800,
      height:600
    };

    this.bindListeners({
      handleResize: ResizeActions.WINDOW_RESIZED
    });
  }

  handleResize(info) {
    this.state.width = info.w;
    this.state.height = info.h;
  }
}

module.exports = alt.createStore(WindowStore, 'WindowStore');
