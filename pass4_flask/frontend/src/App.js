import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Kindergarten from './components/Kindergarten';
import FirstGrade from './components/FirstGrade'; // Optional

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={Login} />
        <Route path="/kindergarten" component={Kindergarten} />
        <Route path="/first-grade" component={FirstGrade} /> {/* Optional */}
      </Routes>
    </Router>
  );
}

export default App;
