import React from 'react';
import Header from './pages/Header';
import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

const App = () => {
    return (
        <div>
            <Header />
            <AboutMe />
            <Projects />
            <Skills />
            <Contact />
        </div>
    );
};

export default App;
