import alt from '../alt';

class UserCenterActions {
    JumpTo(pageName) {
        this.dispatch(pageName);
    }
    Edit() {
        this.dispatch();
    }
    Cancel() {
        this.dispatch();
    }
    Confirm(newProfile) {
        this.dispatch(newProfile);
    }
    ActivityJumpTo(pageName) {
        this.dispatch(pageName);
    }
}

module.exports = alt.createActions(UserCenterActions);
