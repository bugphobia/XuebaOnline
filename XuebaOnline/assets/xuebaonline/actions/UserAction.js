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
    GetUserInfo() {
        this.dispatch();
    }
    ReceiveUserInfo(response) {
        this.dispatch(response);
    }
    Logout() {
        this.dispatch();
    }
    ReceiveLogout(response) {
        this.dispatch(response);
    }
}

module.exports = alt.createActions(UserActions);
