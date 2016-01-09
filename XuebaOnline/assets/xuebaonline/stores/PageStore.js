import alt from '../alt';
import JumpPageActions from '../actions/JumpPageActions';

class PageStore {
    constructor() {
        this.state = {
            currentPage:"index",
        };

        this.bindListeners({
            handleJumpTo: JumpPageActions.JUMP_TO,
        });
    }

    handleJumpTo(pageName) {
        this.state.currentPage = pageName;
    }
}

module.exports = alt.createStore(PageStore, 'PageStore');
