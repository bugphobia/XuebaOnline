import alt from '../alt';
import JumpPageActions from '../actions/JumpPageActions';

class PageStore {
    constructor() {
        this.state = {
            currentPage:"index",
            currentUserCenterTab:"activity"
        };

        this.bindListeners({
            handleJumpTo: JumpPageActions.JUMP_TO,
            handleUserCenterJumpTo: JumpPageActions.USER_CENTER_JUMP_TO
        });
    }

    handleJumpTo(pageName) {
        this.state.currentPage = pageName;
    }

    handleUserCenterJumpTo(pageName) {
        this.state.currentUserCenterTab=pageName;
    }
}

module.exports = alt.createStore(PageStore, 'PageStore');
