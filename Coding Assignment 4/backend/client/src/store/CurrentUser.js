import { observable, decorate, computed } from 'mobx'

class CurrentUser {
  loading = false
  user = null
  error = null

  constructor() {
    this.loading = true
    let userFromSession = JSON.parse(sessionStorage.getItem('user'))
    if (userFromSession) {
      this.user = userFromSession
    } else {
      this.user = null
    }
    this.loading = false
  }

  login(cred) {
    this.error = null
    this.loading = true
    fetch('http://localhost:5000/api/auth/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cred)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          this.user = null
          this.error = json.error
        } else {
          this.user = json
          if (json.role === 'admin') {
          }
          sessionStorage.setItem('user', JSON.stringify(json))
        }
        this.loading = false
      })
      .catch(err => {
        console.log(err)
        this.user = null
        this.loading = false
      })
  }

  logout() {
    sessionStorage.removeItem('user')
    this.user = null
    this.error = 'You have been logged out'
  }
}

decorate(CurrentUser, {
  loading: observable,
  user: observable,
  error: observable
})

let currentUser = new CurrentUser()

export default currentUser
