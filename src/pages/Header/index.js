import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const sections = ['#home', '#projets','#a-propos', '#skills', '#contact'];

const Header = () => {
    const [activeSection, setActiveSection] = useState('#home');

    useEffect(() => {
        const handleScroll = () => {
            let currentSection = '#home';
            for (const section of sections) {
                const element = document.querySelector(section);
                if (element && element.getBoundingClientRect().top <= 0) {
                    currentSection = section;
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);


    return (
        <section id="home">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' , marginBottom: '4em'}}>
                <AppBar position="fixed" color="primary" sx={{ maxWidth: '100%', background: '#38B3FF', paddingRight: '10em'}}>
                    <Toolbar sx={{ justifyContent: 'flex-end' }}>
                        <Button color="inherit" href="#home" style={{ textDecoration: activeSection === "#home" ? "underline" : "none"}}>Accueil</Button>
                        <Button color="inherit" href="#projets" style={{ textDecoration: activeSection === "#projets" ? "underline" : "none"}}>Projets</Button>
                        <Button color="inherit" href="#a-propos" style={{ textDecoration: activeSection === "#a-propos" ? "underline" : "none"}}>A-propos</Button>
                        <Button color="inherit" href="#skills" style={{ textDecoration: activeSection === "#skills" ? "underline" : "none"}}>Savoirs et compétences</Button>
                        <Button color="inherit" href="#contact" style={{ textDecoration: activeSection === "#contact" ? "underline" : "none"}}>Contact</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </section>
    );
};

export default Header;
