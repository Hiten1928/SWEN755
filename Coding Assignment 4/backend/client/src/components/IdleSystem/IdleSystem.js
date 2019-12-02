import React, { Component } from 'react'
import IdleTimer from 'react-idle-timer'
import { Modal, Header, Button } from 'semantic-ui-react'
import currentUser from '../../store/CurrentUser'

export default class IdleSystem extends Component {
  constructor() {
    super()
    this.idleTimer = null
    this.logoutTimer = null
    this.state = {
      warningModal: false
    }
  }
  warn = () => {
    this.setState({
      warningModal: true
    })
  }

  resetTimer = () => {
    this.logoutTimer.reset()
    this.idleTimer.reset()
    this.setState({
      warningModal: false
    })
  }

  closeModal = name => {
    this.setState({
      [name]: false
    })
  }
  render() {
    return (
      <React.Fragment>
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref
          }}
          element={document}
          onIdle={this.warn}
          debounce={250}
          timeout={5000}
        />
        <IdleTimer
          ref={ref => (this.logoutTimer = ref)}
          element={document}
          onIdle={() => currentUser.logout()}
          debounce={250}
          timeout={10000}
        />
        {/* Warning modal */}
        <Modal
          basic
          open={this.state.warningModal}
          onClose={this.closeModal.bind(this, 'warningModal')}
        >
          <Header icon='warning' content='Session timeout warning' />
          <Modal.Content>
            <h3>
              Your session will reset in 5 seconds, click on reset to keep the
              timer running.
            </h3>
          </Modal.Content>
          <Modal.Actions>
            <Button inverted color='green' onClick={this.resetTimer}>
              Reset timer
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}
