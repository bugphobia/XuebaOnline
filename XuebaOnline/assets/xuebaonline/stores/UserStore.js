import alt from '../alt';
import UserActions from '../actions/UserAction';
import JumpPageActions from '../actions/JumpPageActions';

class UserStore {
    constructor() {
        this.state = {
            state:"ok", // ok, loading, failed
            user_name:"",
            password:"",
            isLogin:false,
            email:"",
            creation_time:0,
            realname:"",
            description:"",
            credit:0,
            forgottime:0,
            download:0,
            errors:[]
        };
        this.bindListeners({
            handleRegister: UserActions.REGISTER,
            handleLogin: UserActions.LOGIN,
            handleRegisterResponse: UserActions.RECEIVE_REGISTER_RESPONSE,
            handleLoginResponse: UserActions.RECEIVE_LOGIN_RESPONSE,
            handleError: UserActions.RECEIVE_ERROR
        });
    }

    handleError(err) {
        this.state.state = "failed";
        this.state.errors = [err];
    }

    handleRegisterResponse(response) {
        if (response.state == "ok") {
            this.state.state = "ok";
            this.state.errors = [];
            UserActions.Login.defer({
                username:this.state.user_name,
                password:this.state.password,
                email:this.state.email
            });
            this.state.password = "";
        } else {
            this.state.state = "failed";
            if (typeof(response.errors) != 'undefined') {
                this.state.errors = response.errors;
            } else {
                this.state.errors = ["unknown error!"];
            }
        }
    }

    handleRegister(regInfo) {
        this.state.state = "loading";
        this.state.user_name=regInfo.username;
        this.state.email = regInfo.email;
        this.state.password = regInfo.password;
        console.log("[REGISTER]");
        console.log(regInfo);
        $.ajax({
            url: '/accounts/signup/',
            dataType: 'json',
            cache: false,
            type:"POST",
            data:regInfo,
            success:function(response){
                UserActions.ReceiveRegisterResponse(response);
            },
            error: function(xhr, status, err) {
                UserActions.ReceiveError(err);
            }
        });
    }

    handleLoginResponse(response) {
        if (response.state == "ok") {
            this.state.state = "ok";
            this.state.isLogin = true;
            JumpPageActions.JumpTo.defer('index');
        } else {
            this.state.state = "failed";
            this.state.isLogin = false;
            if (typeof(response.errors) != 'undefined') {
                this.state.errors = response.errors;
            } else {
                this.state.errors = ["unknown error!"];
            }
        }
    }

    handleLogin(info) {
        this.state.state = "loading";
        this.state.user_name=info.username;
        this.state.email = info.email;
        console.log("[LOGIN]");
        console.log(info);
        $.ajax({
            url: '/accounts/login/',
            dataType: 'json',
            type:"POST",
            data:info,
            cache: false,
            success:function(response){
                UserActions.ReceiveLoginResponse(response);
            },
            error: function(xhr, status, err) {
                UserActions.ReceiveError(err);
            }
        });
    }
}

module.exports = alt.createStore(UserStore, 'UserStore');
