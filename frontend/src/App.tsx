import React from 'react';
import { Router } from 'react-router-dom';
import history from './services/history';
import Menu from './components/menu';
import { AuthProvider } from './contexts/AuthContext';
import Routes from './routes';

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <div className="pure-g">
          <div className="pure-u-3-24">
            <Menu />
          </div>
          <div className="pure-u-21-24">
            <Routes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
