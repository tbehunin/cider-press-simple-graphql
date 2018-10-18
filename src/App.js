import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RestView from './RestView';
import JavascriptView from './JavascriptView';
import ApolloView from './ApolloView';

const views = ['rest', 'javascript graphql client', 'apollo client']
class App extends Component {
  state = {
    currentView: 'rest',
  };
  handleMenuClick = view => {
    this.setState({ currentView: view });
  }
  render() {
    const { currentView } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul className="menu-links">
            {views.map(view => (
              <li
                className={view === currentView ? 'selected' : ''}
                key={view}
                onClick={this.handleMenuClick.bind(this, view)}
              >
                {view}
              </li>
            ))}
          </ul>
        </header>
        {currentView === 'rest' ? <RestView /> :
          currentView === 'javascript graphql client' ? <JavascriptView /> : <ApolloView />
        }
      </div>
    );
  }
}

export default App;
