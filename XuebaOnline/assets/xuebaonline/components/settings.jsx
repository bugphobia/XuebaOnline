import React from 'react'
import Header from './header'
import "../semantic.css"
import UserStore from '../stores/UserStore'
import UserCenterStore from '../stores/UserCenterStore'
import UserCenterActions from '../actions/UserCenterActions'

var inlineStyle = {
  paddingTop:'2 px'
};

export default class FormField extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.edit) {
      return (
        <input onChange={this.props.onChange} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} />
      );
    } else {
      return (
        <div className="ui basic label">
          {this.props.children}
        </div>
      );
    }
  }
}


export default class EditButtons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.editState) {
      return (
        <div className="ui grid">
          <div className="ten wide column"></div>
          <div className="six wide column">
            <div className="ui icon fluid button" onClick={this.props.toggleEdit}>
              <i className="edit icon"></i>
              Edit
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui grid">
          <div className="ten wide column"></div>
          <div className="six wide column">
            <div className="ui buttons">
              <div className="ui icon teal button" onClick={this.props.toggleEdit}>
                <i className="edit icon"></i>
                Confirm
              </div>
              <div className="ui icon red button" onClick={this.props.cancel}>
                <i className="remove icon"></i>
                Cancel
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:UserStore.getState().user_name,
      email:UserStore.getState().email,
      credit:UserStore.getState().credit,
      realname:UserStore.getState().realname,
      creation_time:UserStore.getState().creation_time,
      editState:UserCenterStore.getState().editState,
      description:UserStore.getState().description
    };
    this.realname = "";
    this.email = "";
    this.description = "";
    this.onUserChange = this.onUserChange.bind(this);
    this.onUserStoreChange = this.onUserStoreChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onRealnameChange = this.onRealnameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }
  onUserChange(state) {
    this.state.username=state.user_name;
    this.state.email=state.email;
    this.state.credit=state.credit;
    this.state.realname=state.realname;
    this.state.creation_time=state.creation_time;
    this.state.description=state.description;
    this.forceUpdate();
  }
  onUserStoreChange(state) {
    this.state.editState=state.editState;
    this.forceUpdate();
  }
  componentDidMount() {
    UserStore.listen(this.onUserChange);
    UserCenterStore.listen(this.onUserStoreChange);
  }
  componentWillUnmount() {
    UserCenterStore.unlisten(this.onUserStoreChange);
    UserStore.unlisten(this.onUserChange);
  }
  toggleEdit() {
    if (this.state.editState) {
      UserCenterActions.Confirm({
        realname:this.realname,
        email:this.email,
        description:this.description
      });
    } else {
      this.realname=this.state.realname;
      this.email=this.state.email;
      this.description=this.state.description;
      UserCenterActions.Edit();
    }
  }
  cancel() {
    UserCenterActions.Cancel();
  }
  onRealnameChange(event) {
    this.realname = event.target.value;
  }
  onEmailChange(event) {
    this.email = event.target.value;
  }
  onDescriptionChange(event) {
    this.description = event.target.value;
  }
  render() {
    return (
      <div className="ui yellow segment">
        <h3 className="ui header">
          Private information
        </h3>
        <div className="ui two column grid">
          <div className="four wide center aligned column">
            <div className="row">
              <img id="EditProfilePicture" className="ui image" src={require("./SearchLogo.jpg")}/>
            </div>
          </div>
          <div className="eleven wide column">
            <div className="row">
              <div className="ui form">
                <div className="three fields">
                  <div className="field">
                    <label>Real Name</label>
                    <FormField edit={this.state.editState} placeholder="real name" onChange={this.onRealnameChange} defaultValue={this.state.realname}>
                      {(this.state.realname == "" || this.state.realname==" ")?'None':this.state.realname}
                    </FormField>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="ui form">
                <div className="field">
                  <label>E-mail</label>
                  <FormField edit={this.state.editState} placeholder="email" onChange={this.onEmailChange} defaultValue={this.state.email}>
                    {this.state.email}
                  </FormField>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="ui form">
                <div className="field">
                  <label>Creation Date</label>
                  <div className="ui basic label">
                    {this.state.creation_time}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="ui form">
                <div className="field">
                  <label>Description</label>
                  <FormField edit={this.state.editState} placeholder="description" onChange={this.onDescriptionChange} defaultValue={this.state.description}>
                    {(this.state.description == "" ||
                      this.state.description == null ) ?
                     'None' : this.state.description }
                  </FormField>
                </div>
              </div>
            </div>
            <div className="ui divider"></div>
            <EditButtons editState={this.state.editState} toggleEdit={this.toggleEdit} cancel={this.cancel}/>
          </div>
        </div>
      </div>
    );
  }
}
