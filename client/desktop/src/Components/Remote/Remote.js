import React from 'react'
import io from 'socket.io-client'

class Remote extends React.Component {
  constructor(props) {
    super()
    this.state = {
      next: props.handlePageIncrease,
      previous: props.handlePageDecrease,
      socket: null,
      connection: false,
      code: null,
      remoteOn: false
    }
  }

  componentDidMount() {
    let socket = io('http://localhost:8000')

    socket.on('connect', () => {
      this.setState({
        socket: socket,
        connection: true
      })
    })

    socket.on('disconnect', () => {
      this.setState({
        socket: null,
        connection: false
      })
    })

    socket.on('clientRegistered', e => {
      if (e.keyVal) {
        this.setState({
          code: e.keyVal
        })
      }
    })

    socket.on('remoteConnected', () => {
      this.setState({
        remoteOn: true
      })
    })

    socket.on('increment', () => {
      this.state.next()
    })

    socket.on('decrement', () => {
      this.state.previous()
    })
  }

  getCode = () => {
    this.state.socket.emit('registerAsClient')
  }

  render() {

    let { remoteOn, code, connection } = this.state

    return (
      <div id='remote'>
        <h3>Remote:</h3>
        {(!remoteOn && !code && connection) ? (
          <button onClick={this.getCode}>Get Code!</button>
        ) : null}

        {(!remoteOn && code && connection) ? (
          <h3>Code: {code}</h3>
        ) : null}

        {(remoteOn && code && connection) ? (
          <h2>Remote is connected</h2>
        ) : null}
      </div>
    )
  }
}

export default Remote