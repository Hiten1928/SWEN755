import React, { Component } from 'react'
import currentUser from '../../store/CurrentUser'
import { observer } from 'mobx-react'
import { Button, Container, Header, Form, Message } from 'semantic-ui-react'
import './Login.css'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = e => {
    e.preventDefault()
    let { email, password } = this.state
    currentUser.login({ email, password })
  }

  render() {
    return (
      <div className='loginContainer'>
        <h1 className='heading'>Good morning</h1>
        <div className='form'>
          <div className='formGroup'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              placeholder='Enter your email'
              value={this.state.email}
              onChange={this.onChange}
              name='email'
            />
          </div>
          <div className='formGroup'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              onChange={this.onChange}
              placeholder='Enter your password'
              value={this.state.password}
            />
          </div>
          <div className='formGroup'>
            <button onClick={this.login}>Log In</button>
          </div>
        </div>
      </div>
    )
    return (
      <Container>
        <Header as='h2'>Good morning</Header>
        <Form loading={currentUser.loading}>
          <Form.Field>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              placeholder='Enter your email'
              value={this.state.email}
              onChange={this.onChange}
              name='email'
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              onChange={this.onChange}
              placeholder='Enter your password'
              value={this.state.password}
            />
          </Form.Field>
          <div className='formGroup'>
            <Button onClick={this.login}>Log In</Button>
          </div>
        </Form>
        {currentUser.error && (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{currentUser.error}</p>
          </Message>
        )}
      </Container>
    )
  }
}

export default observer(Login)
