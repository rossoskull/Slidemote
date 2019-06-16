import React from 'react'

class Remote extends React.Component {
  constructor(props) {
    super()
    this.state = {
      next: props.handlePageIncrease,
      previous: props.handlePageDecrease
    }
  }

  render() {
    return (
      <div id='remote'>
        <h3>Remote:</h3>
        <button onClick={this.state.next}>+</button>
        <button onClick={this.state.previous}>-</button>
      </div>
    )
  }
}

export default Remote