import { observable, decorate } from 'mobx'
import currentUser from './CurrentUser'

class UserStore {
  loading = false
  users = []
  error = null

  constructor() {}

  getUsers() {
    this.loading = true
    fetch('http://localhost:5000/api/user/getUsers', {
      headers: {
        'x-auth-token': currentUser.user['x-auth-token']
      }
    })
      .then(res => res.json())
      .then(json => {
        this.users = json
        this.loading = false
      })
      .catch(err => {
        this.loading = false
        console.log('error from adminStore', err)
      })
  }

  createUser(user) {
    this.loading = true
    return fetch('http://localhost:5000/api/user/newUser', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'x-auth-token': currentUser.user['x-auth-token'],
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        this.getUsers()
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      })
  }

  getUser(id) {
    return this.users.find(item => id === item._id)
  }

  editUser(id, user) {
    return fetch('http://localhost:5000/api/user/editUser', {
      method: 'post',
      body: JSON.stringify({
        _id: id,
        name: user.name,
        email: user.email,
        ...(user.password !== '' && { password: user.password })
      }),
      headers: {
        'x-auth-token': currentUser.user['x-auth-token'],
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        this.getUsers()
        return true
      })
      .catch(err => {
        console.log('err', err)
        return false
      })
  }

  deleteUser(id) {
    return fetch('http://localhost:5000/api/user/deleteUser', {
      method: 'delete',
      body: JSON.stringify({
        _id: id
      }),
      headers: {
        'x-auth-token': currentUser.user['x-auth-token'],
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        this.getUsers()
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      })
  }
}

decorate(UserStore, {
  loading: observable,
  users: observable,
  error: observable,
  authToken: observable
})

let userStore = new UserStore()

export default userStore
