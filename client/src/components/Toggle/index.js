import React, { Component } from 'react'

class Toggle extends Component {
  state = {}
  handleClick = () =>
    this.setState((prevState) => ({ active: !prevState.active }))

  render() {
    const { active } = this.state

    return (
      <button toggle active={active} onClick={this.handleClick} className='toggle-btn'>
        Change Theme
      </button>
    )
  }
}

export default Toggle