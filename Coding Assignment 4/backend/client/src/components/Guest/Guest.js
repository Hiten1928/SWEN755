import React, { Component } from 'react'
import { observer } from 'mobx-react'
import currentUser from '../../store/CurrentUser'
import IdleSystem from '../IdleSystem/IdleSystem'

class Guest extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='mainContainer'>
        <IdleSystem />
        <div className='headerContainer'>
          <h1>
            Welcome <span>{currentUser.user.name}</span>
          </h1>
          <button onClick={() => currentUser.logout()}>Logout</button>
        </div>
        <div className='contentContainer'>
          <div className='left'>
            <h1 className='heading'>Car Settings</h1>
            <ul className='leftList'>
              {['Autopilot', 'Seat Position', 'Seat Height', 'Volume'].map(
                (item, i) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(Guest)
