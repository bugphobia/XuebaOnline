import alt from '../alt';

class JumpPageActions {
    JumpTo(pageName) {
        this.dispatch(pageName);
    }
    UserCenterJumpTo(pageName) {
        this.dispatch(pageName);
    }
}

module.exports = alt.createActions(JumpPageActions);
