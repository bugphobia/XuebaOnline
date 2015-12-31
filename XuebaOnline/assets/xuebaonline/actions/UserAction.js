import alt from '../alt';

class UserActions {
    Register(regInfo) {
        this.dispatch(regInfo);
    }
    Login(info) {
        this.dispatch(info);
    }
    ReceiveLoginResponse(response) {
        this.dispatch(response);
    }
    ReceiveRegisterResponse(response) {
        this.dispatch(response);
    }
    ReceiveError(err) {
        this.dispatch(err);
    }
}

module.exports = alt.createActions(UserActions);
