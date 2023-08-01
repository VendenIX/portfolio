import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import translations from '../../translations/fr.js';

const Header = () => {
    return (
        <section id="home">
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {translations['about.name']}
                    </Typography>
                    <Button color="inherit" href="#home">Accueil</Button>
                    <Button color="inherit" href="#a-propos">A-propos</Button>
                    <Button color="inherit" href="#projets">Projets</Button>
                    <Button color="inherit" href="#skills">Savoirs et compétences</Button>
                    <Button color="inherit" href="#contact">Contact</Button>
                </Toolbar>
            </AppBar>
        </section>
    );
};

export default Header;
