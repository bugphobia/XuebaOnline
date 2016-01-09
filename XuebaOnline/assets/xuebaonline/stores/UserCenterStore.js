import alt from '../alt';
import UserCenterActions from '../actions/UserCenterActions';
import UserActions from '../actions/UserAction';

class UserCenterStore {
    constructor() {
        this.state = {
            currentTab:"activity",
            editState:false
        };

        this.bindListeners({
            handleJumpTo: UserCenterActions.JUMP_TO,
            handleEdit: UserCenterActions.EDIT,
            handleConfirm: UserCenterActions.CONFIRM,
            handleCancel: UserCenterActions.CANCEL
        });
    }

    handleJumpTo(pageName) {
        this.state.currentTab = pageName;
    }

    handleCancel() {
        this.state.editState = false;
    }
    
    handleEdit() {
        this.state.editState = true;
    }

    handleConfirm(newProfile) {
        console.log(newProfile);
        this.state.editState = false;
        $.ajax({
            url: '/accounts/updateprofile/',
            dataType: 'json',
            cache: false,
            data:newProfile,
            type:"GET",
            success:function(response){
                UserActions.GetUserInfo();
            },
            error: function(xhr, status, err) {
                // nothing to do
            }
        });
    }
}

module.exports = alt.createStore(UserCenterStore, 'UserCenterStore');
