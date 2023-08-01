import React from 'react';
import Header from './pages/Header/';
import AboutMe from './pages/AboutMe/';
import Projects from './pages/Projects/';
import Skills from './pages/Skills';
import Contact from './pages/Contact/';
import Home from './pages/Home/';
const App = () => {
    return (
        <div>
            <Header />
            <Home />
            <Projects />
            <AboutMe />
            <Skills />
            <Contact />
        </div>
    );
};

export default App;
