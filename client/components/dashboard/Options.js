import React, { Component, PropTypes } from 'react'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'

class Options extends Component {
  handleLogout(e) {
    e.preventDefault()
    
    this.props.logout()
  }

  showSettings(e) {
    e.preventDefault()

    this.props.showSettings()
  }
  
  render() {
    return (
      <IconMenu iconButtonElement={
        <IconButton className="options-icon" iconStyle=
          {{
            height: '32px',
            width: '32px'
          }}
        >
          <MoreVertIcon />
        </IconButton>
      }>
        <MenuItem primaryText="Settings" onTouchTap={this.showSettings.bind(this)}/>
        <MenuItem primaryText="Sign out" onTouchTap={this.handleLogout.bind(this)}/>
      </IconMenu>
    )
  }
}

Options.propTypes = {
  logout: PropTypes.func.isRequired
}

export default Options
