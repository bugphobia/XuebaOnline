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
}

module.exports = alt.createActions(UserCenterActions);
