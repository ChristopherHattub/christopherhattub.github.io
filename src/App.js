import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Contact from './sections/Contact/Contact';
import Projects from './sections/Projects/Projects';
import Career from './sections/Career/Career';
import Education from './sections/Education/Education';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      
      <main>
        <Contact />
        <Projects />
        <Career />
        <Education />
      </main>
    </div>
  );
}

export default App;