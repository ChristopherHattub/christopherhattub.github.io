import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import ProjectsPage from './pages/ProjectsPage';


export function App(props) {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/" component={ResumePage} />
          <Route exact path="/" component={ProjectsPage}  />
          {/* Add other routes here for additional pages */}
        </Switch>
      </div>
    </Router>
  );
}
// Log to console
console.log('Hello console')