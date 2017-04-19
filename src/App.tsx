import * as React from 'react';
import './App.css';
import ZFetch from './fetch';
const download = require('downloadjs');
const logo = require('./logo.svg');

import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends React.Component<{}, null> {
  handleSubmit = () => {
    ZFetch('http://localhost:4000/')('POST')('/')({body: (this.refs['proto'] as HTMLTextAreaElement).value}).then(v => v.blob()).then(v => download(v));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Visual Protocol Buffer</h2>
        </div>
        <p className="App-intro">
          A visual generator of Protocol Buffer, the Google's data interchange format.
        </p>
        <input type="text" placeholder="Message Name"/>
        <textarea name="proto" id="proto" ref="proto" cols={30} rows={10}/>
        <br/>
        <button id="btn-generate" onClick={this.handleSubmit}>Generate</button>
      </div>
    );
  }
}

export default App;
