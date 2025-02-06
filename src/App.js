import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Contact from './sections/Contact/Contact';
import Education from './sections/Education/Education';
import Projects from './sections/Projects/Projects';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      
      <main>
        <Contact />

        <Projects />

        <Education />
        
      </main>
    </div>
  );
}

export default App;