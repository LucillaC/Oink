import React, { Component, PropTypes } from 'react'
import { DatePicker, DatePickerDialog, TextField } from 'material-ui'

class GoalConfigurer extends Component {
  render() {
    return (
      <form>
        <div className = "row">
          <h5> Create a goal </h5>
        </div>
        <div className = "row">
          <TextField
            hintText="What is your goal?" />
        </div>
        <div className = "row">
          <TextField
            hintText="How much would you like to save?" />
        </div>
        <div className = "row">
          <DatePicker
            hintText="When do you want your goal by?"
            mode="portrait"/>
        </div>
        <div className = "row">
          
        </div>

      </form>
    )
  }
}

export default GoalConfigurer