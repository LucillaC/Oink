import React, { Component, PropTypes } from 'react'
import { Dialog, Tabs, Tab, FlatButton } from 'material-ui'
import { Link } from 'react-router'
import AccountSettingsField from './AccountSettingsField'
import CommunicationSettingsField from './CommunicationSettingsField'
import SecuritySettingsField from './SecuritySettingsField'

class SettingsModal extends Component {

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.showSettings) {
  //     this.props.showSettings ? return : this.refs.modal.show()
  //   }
  // }

  // shouldComponentUpdate() {
  //   return false
  // }

  componentDidUpdate() {
    if (this.props.showSettings) {
      this.refs.modal.show()
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { showSettings } = this.props
    showSettings ? this.handleSettings() : null
  }

  handleSettings() {

    const { accountData, communicationData, securityData } = this.props

    let completeData = {}

    for (let key in accountData) {
      completeData[key] = accountData[key]
    }

    for (let key in communicationData) {
      completeData[key] = communicationData[key]
    }

    // verify that new password field in security data exists and that password has been verified
    if (securityData.newPassword && !securityData.errorText) {
      completeData.password = securityData.newPassword
    }

    this.props.postSettings(completeData)
    this.props.hideSettingsModal()
    this.refs.modal.dismiss()
  }

  handleCancel(e) {
    e.preventDefault()
    const { showSettings, hideSettingsModal, editFinishAll, editingEmail, editingPassword, editingFirstName,
            editingLastName, editingPhoneNumber, editingDeleteAccount } = this.props
    if (editingEmail || editingPhoneNumber || editingPassword || editingFirstName || editingLastName) {
      if (confirm('You have unsaved changes to your settngs, are you sure you want to quit?')) {
        showSettings ? hideSettingsModal() : null
        editFinishAll()
        this.refs.modal.dismiss()
      }
    } else {
      showSettings ? hideSettingsModal() : null
      editFinishAll()
      this.refs.modal.dismiss()
    }
  }

  parsePhoneNumber(num) {
    if (num.length === 10) {
      return '(' + num.slice(0, 3) + ')' + num.slice(3, 6) + '-' + num.slice(6)
    }

    return num
  }

  render() {
    let user = {
      firstName: this.props.data.user ? this.props.data.user.first_name : '',
      lastName: this.props.data.user ? this.props.data.user.last_name : '',
      email: this.props.data.user ? this.props.data.user.email : '',
      phoneNumber: this.props.data.user ? this.props.data.user.phone_number : ''
    }

    let userData = [
      {property: user.firstName, title: 'First Name', key: 'FIRST_NAME', editing: this.props.editingFirstName},
      {property: user.lastName,  title: 'Last Name', key: 'LAST_NAME', editing: this.props.editingLastName},
      {property: user.email,  title: 'Email', key: 'EMAIL', editing: this.props.editingEmail},
      {property: this.parsePhoneNumber(user.phoneNumber), title: 'Phone Number', key: 'PHONE_NUMBER', editing: this.props.editingPhoneNumber}
    ]

    let modalActions = [
      <FlatButton
        key={0}
        label='Cancel'
        secondary={true}
        onTouchTap={this.handleCancel.bind(this)} />,
      <FlatButton
        key={1}
        label='Save'
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)} />
    ]

    return (
      <Dialog
        actionsContainerClassName="actions"
        bodyClassName="settings-body"
        contentClassName="settings-content"
        titleClassName="settings-title"
        ref='modal'
        actions={modalActions}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        modal={true}
      >
        <Tabs contentContainerClassName='settings-tabs-container' className='settings-tabs' tabItemContainerStyle={{padding: '0px'}}>
          <Tab label='Account' >
            <div className='modal-content'>

              <AccountSettingsField
                userData={userData}
                editStart={this.props.editStart}
                editFinish={this.props.editFinish}
                firstName={user.firstName}
                editingFirstName={this.props.editingFirstName}
                lastName={user.lastName}
                editingLastName={this.props.editingLastName}
                email={user.email}
                editingEmail={this.props.editingEmail}
                phoneNumber={user.phoneNumber}
                editingPhoneNumber={this.props.editingPhoneNumber}
                updateAccountSettings={this.props.updateAccountSettings}
                updateCommunicationSettings={this.props.updateCommunicationSettings}
                updateSecuritySettings={this.props.updateSecuritySettings}
              />
              
            </div>
          </Tab>
          <Tab label='Communication' >
            <div className='modal-content'>

              <CommunicationSettingsField
                user={this.props.data.user}
                updateCommunicationSettings={this.props.updateCommunicationSettings}
                communicationData={this.props.communicationData}
              />
              
            </div>
          </Tab>
          <Tab label='Security' >
            <div className='modal-content'>

              <SecuritySettingsField
                editStart={this.props.editStart}
                editFinish={this.props.editFinish}
                editingPassword={this.props.editingPassword}
                editingDeleteAccount={this.props.editingDeleteAccount}
                updateSecuritySettings={this.props.updateSecuritySettings}
                securityData={this.props.securityData}
                deleteAccount={this.props.deleteAccount}
              />
              
            </div>
          </Tab>
        </Tabs>
      </Dialog>
    )
  }
}

SettingsModal.propTypes = {
  showSettings: PropTypes.bool.isRequired,
  hideSettingsModal: PropTypes.func.isRequired,
  showSettingsModal: PropTypes.func.isRequired
}

export default SettingsModal
