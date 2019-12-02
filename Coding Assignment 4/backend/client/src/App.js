import React, { Component } from 'react'
import { observer } from 'mobx-react'
import currentUser from './store/CurrentUser'
import Admin from './components/Admin/Admin'
import Login from './components/Login/Login'
import './App.css'
import User from './components/User/User'
import Guest from './components/Guest/Guest'

class App extends Component {
  showComponent = () => {
    if (currentUser.user) {
      switch (currentUser.user.role) {
        case 'admin':
          return <Admin />
        case 'user':
          return <User />
        case 'guest':
          return <Guest />
        default:
          return <Login />
      }
    } else {
      return <Login />
    }
  }

  render() {
    return <div className='appContainer'>{this.showComponent()}</div>
  }
}

export default observer(App)
