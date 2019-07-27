import React from 'react'
import io from 'socket.io-client'

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      connection: false,
      socket: null,
      remoteOn: false,
      code: '',
      codeError: true,
      codeErrorMsg: ''
    }
  }

  componentDidMount() {
    let socket = io(`${window.origin}`)
    
    socket.on('connect', () => {
      this.setState({
        connection: true,
        socket: socket
      })
    })

    socket.on('disconnect', () => {
      this.setState({
        connection: false,
        socket: null,
        remoteOn: false
      })
    })

    socket.on('remoteConnected', () => {
      this.setState({
        remoteOn: true
      })
    })

    socket.on('remoteRegNoClient', () => {
      console.log('No client with that ID found')
    })
  }

  handleInput = e => {
    this.setState({
      code: e.target.value
    }, () => {
      if (this.state.code.length !== 6 || isNaN(this.state.code)) {
        this.setState({
          codeErrorMsg: 'Must be a number of 6 digits.',
          codeError: true
        })
      } else {
        this.setState({
          codeError: false,
          codeErrorMsg: null
        })
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.state.socket.emit('registerAsRemote', {keyVal: this.state.code})
  }

  handleIncrement = e => {
    this.state.socket.emit('increment', {keyVal: this.state.code})
  }

  handleDecrement = e => {
    this.state.socket.emit('decrement', {keyVal: this.state.code})
  }

  render() {

    let { connection, remoteOn, codeError, codeErrorMsg } = this.state 

    return (
      <div id='App'>
        <p>Server connection status: {connection ? 'Connected' : 'Not Connected'}</p>

        {(connection && remoteOn) ? (
          <div>
            <button onClick={this.handleDecrement}>-</button> &nbsp;
            <button onClick={this.handleIncrement}>+</button>
          </div>
        ) : (
          <div>
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleInput} name="code" type="text" placeholder="Enter code" />
              {codeError ? (<i>{codeErrorMsg}</i>) : null}
              <input type="submit" value="Connect" disabled={codeError}/>
            </form>
          </div>
        )}

      </div>
    )
  }
}

export default App