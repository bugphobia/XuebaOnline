import alt from '../alt';
import UserActions from '../actions/UserAction';
import JumpPageActions from '../actions/JumpPageActions';

window.jQuery = window.$ = require('../jquery.js');

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
            favorite_tags:[],
            errors:[]
        };
        this.bindListeners({
            handleRegister: UserActions.REGISTER,
            handleLogin: UserActions.LOGIN,
            handleRegisterResponse: UserActions.RECEIVE_REGISTER_RESPONSE,
            handleLoginResponse: UserActions.RECEIVE_LOGIN_RESPONSE,
            handleError: UserActions.RECEIVE_ERROR,
            handleGetUserInfo: UserActions.GET_USER_INFO,
            handleReceiveUserInfo: UserActions.RECEIVE_USER_INFO,
            handleLogout: UserActions.LOGOUT,
            handleReceiveLogout: UserActions.RECEIVE_LOGOUT
        });
    }

    handleReceiveLogout(response) {
        if (response.state == "ok") {
            this.state.isLogin = false;
        }
    }

    handleError(err) {
        this.state.state = "failed";
        this.state.errors = [err];
    }

    handleLogout() {
        $.ajax({
            url: '/accounts/logout/',
            dataType: 'json',
            cache: false,
            type:"GET",
            success:function(response){
                UserActions.ReceiveLogout(response);
            },
            error: function(xhr, status, err) {
                // nothing to do
            }
        });
    }

    handleGetUserInfo() {
        $.ajax({
            url: '/accounts/userinfo/',
            dataType: 'json',
            cache: false,
            type:"GET",
            success:function(response){
                UserActions.ReceiveUserInfo(response);
            },
            error: function(xhr, status, err) {
                // nothing to do
            }
        });
    }

    handleReceiveUserInfo(response) {
        if (response.state == "ok") {
            this.state.state = "ok";
            this.state.user_name = response.username;
            this.state.email = response.email;
            this.state.creation_time = response.creation_time;
            this.state.realname = response.realname;
            this.state.description = response.description;
            this.state.credit = response.credit;
            this.state.forgottime = response.forgottime;
            this.state.download = response.download;
            this.state.isLogin = true;
        }
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
