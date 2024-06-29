import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './pages/Header/';
import AboutMe from './pages/AboutMe/';
import Projects from './pages/Projects/';
import Skills from './pages/Skills';
import Contact from './pages/Contact/';
import Home from './pages/Home/';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Mono, monospace',
  },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div style={{ backgroundColor: '#38B3FF', color: '#fff' }}>
                <Header />
                <Home />
                <Projects />
                <Skills />
                <AboutMe />
                <Contact />
            </div>
        </ThemeProvider>
    );
};

export default App;