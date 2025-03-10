import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import AboutMe from './pages/AboutMe/';
import Contact from './pages/Contact/';
import CurriculumVitae from './pages/Curriculum-Vitae';
import Header from './pages/Header/';
import Home from './pages/Home/';
import Projects from './pages/Projects/';
import Publications from './pages/Publications';
import Skills from './pages/Skills';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Mono, monospace',
  },
});

const App = () => {
    const [selectedProject, setSelectedProject] = React.useState(null);
    return (
        <ThemeProvider theme={theme}>
            <div style={{ backgroundColor: '#38B3FF', color: '#fff' }}>
                <Header />
                <Home />
                <Projects onSelect={setSelectedProject} />
                <CurriculumVitae />
                <Skills />
                <AboutMe />
                <Publications />
                <Contact />
            </div>
        </ThemeProvider>
    );
};

export default App;
