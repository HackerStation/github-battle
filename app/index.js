import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './components/Popular';
import Battle from './components/Battle';
import { ThemeProvider } from './contexts/theme';
// import { Route, BrowserRouter } from 'react-router-dom';
// Component:
// State
// Life-Cycle
// UI

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }));
      }
    };
  }
  render() {
    return (
      <ThemeProvider value={this.state.theme}>
        <div className='container'>
          {/* <Popular /> */}
          {/* <Route exact path='/battle' component={Battle} /> */}
          <Battle />
        </div>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
