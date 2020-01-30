import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './components/Popular';
import Battle from './components/Battle';
// import { Route, BrowserRouter } from 'react-router-dom';
// Component:
// State
// Life-Cycle
// UI

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        {/* <Popular /> */}
        {/* <Route exact path='/battle' component={Battle} /> */}
        <Battle />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
