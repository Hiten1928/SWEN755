import React, { Component } from 'react'
import { observer } from 'mobx-react'
import currentUser from '../../store/CurrentUser'
import { Icon, Button, Modal, Header } from 'semantic-ui-react'
import userStore from '../../store/UserStore'
import IdleSystem from '../IdleSystem/IdleSystem'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createModalOpen: false,
      editModalOpen: false,
      deleteModalOpen: false,
      workingUser: '',
      name: '',
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    userStore.getUsers()
  }

  openEdit = id => {
    let user = userStore.getUser(id)
    if (user) {
      this.setState({
        editModalOpen: true,
        workingUser: id,
        email: user.email,
        name: user.name,
        password: ''
      })
    }
  }

  openDelete = id => {
    this.setState({
      deleteModalOpen: true,
      workingUser: id
    })
  }

  openNew = id => {
    this.setState({
      createModalOpen: true
    })
  }

  closeModal = name => {
    this.setState({
      workingUser: '',
      [name]: false,
      name: '',
      email: '',
      password: ''
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createUser = () => {
    userStore
      .createUser({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res) {
          this.setState({
            name: '',
            email: '',
            password: '',
            createModalOpen: false
          })
        }
      })
  }

  editUser = () => {
    userStore
      .editUser(this.state.workingUser, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(done => {
        if (done) {
          this.setState({
            name: '',
            email: '',
            password: '',
            editModalOpen: false,
            workingUser: ''
          })
        }
      })
  }

  deleteUser = () => {
    userStore.deleteUser(this.state.workingUser).then(done => {
      if (done) {
        this.setState({
          name: '',
          email: '',
          password: '',
          deleteModalOpen: false,
          workingUser: ''
        })
      }
    })
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
          <div className='right'>
            <h1 className='heading'>Guests</h1>
            <div className='floatRight'>
              <button onClick={this.openNew}>New Guest</button>
            </div>
            <ul className='leftList'>
              {userStore.users.map((item, i) => (
                <li key={item._id}>
                  {item.name} ({item.role})
                  <div className='buttons'>
                    <Button
                      onClick={this.openEdit.bind(this, item._id)}
                      inverted
                      animated='vertical'
                    >
                      <Button.Content hidden>Edit</Button.Content>
                      <Button.Content visible>
                        <Icon name='edit outline' />
                      </Button.Content>
                    </Button>
                    <Button
                      onClick={this.openDelete.bind(this, item._id)}
                      color='red'
                      inverted
                      animated='vertical'
                    >
                      <Button.Content hidden>Delete</Button.Content>
                      <Button.Content visible>
                        <Icon name='trash alternate outline' />
                      </Button.Content>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* create user modal */}
        <Modal
          basic
          open={this.state.createModalOpen}
          onClose={this.closeModal.bind(this, 'createModalOpen')}
        >
          <Header icon='browser' content='Add a new guest' />
          <Modal.Content>
            <div className='form'>
              <div className='formGroup'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  placeholder='Enter your name'
                  value={this.state.name}
                  onChange={this.onChange}
                  name='name'
                />
              </div>
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
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color='red'
              inverted
              onClick={this.closeModal.bind(this, 'createModalOpen')}
            >
              Cancel
            </Button>
            <Button color='green' inverted onClick={this.createUser}>
              Create
            </Button>
          </Modal.Actions>
        </Modal>

        {/* Edit user modal */}
        <Modal
          basic
          open={this.state.editModalOpen}
          onClose={this.closeModal.bind(this, 'editModalOpen')}
        >
          <Header icon='edit' content='Edit guest' />
          <Modal.Content>
            <div className='form'>
              <div className='formGroup'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  placeholder='Enter your name'
                  value={this.state.name}
                  onChange={this.onChange}
                  name='name'
                />
              </div>
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
                  placeholder='Set a new password'
                  value={this.state.password}
                />
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color='red'
              inverted
              onClick={this.closeModal.bind(this, 'editModalOpen')}
            >
              Cancel
            </Button>
            <Button color='green' inverted onClick={this.editUser}>
              Edit
            </Button>
          </Modal.Actions>
        </Modal>

        {/* Delete user modal */}
        <Modal
          basic
          open={this.state.deleteModalOpen}
          onClose={this.closeModal.bind(this, 'deleteModalOpen')}
        >
          <Header icon='trash' content='Delete guest' />
          <Modal.Content>
            <h3>Are you sure?</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button
              inverted
              onClick={this.closeModal.bind(this, 'deleteModalOpen')}
            >
              Cancel
            </Button>
            <Button color='red' inverted onClick={this.deleteUser}>
              Delete
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default observer(User)
