import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from './chat';
import './App.scss';
class App extends Component {
  render() {
    const { feed, sendMessage } = this.props;
    function handleKeyDown(e) {
      if (e.keyCode === 13) {
        return sendMessage(e.target.value);
      }
    }
    return (
      <div>
        <h1>Hello bots</h1>
        <ul className="conversation">
        { feed.map( (entry, index) => <li className={entry.sender} key={index}>{ entry.sender } : { entry.text }</li> ) }
        </ul>
        <input type="text" onKeyDown={handleKeyDown}/>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  feed: state
})

export default connect(mapStatetoProps, {sendMessage})(App);
