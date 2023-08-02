import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import translations from '../../translations/fr.js';

const Contact = () => {
    return (
        <section id="contact" style={{ minHeight: '100vh' }}>
            <div style={{ padding: '20px' }}>
                <Typography variant="h4">{translations['contact.me']}</Typography>
                <p align="left">
                    <a href="mailto:romain.andres@etu.unicaen.fr" target="_blank" rel="noreferrer"> 
                        <img src="https://raw.githubusercontent.com/iconic/open-iconic/master/svg/envelope-closed.svg" alt="email" width="40" height="40" style={{ marginRight: '0.5em' }}/> 
                    </a>
                    <a href="https://www.linkedin.com/in/romain-andres-6b551b203/" target="_blank" rel="noreferrer"> 
                        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg" alt="linkedin" width="40" height="40" style={{ marginRight: '0.5em' }}/> 
                    </a>
                    <a href="https://github.com/VendenIX" target="_blank" rel="noreferrer"> 
                        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" alt="github" width="40" height="40" style={{ marginRight: '0.5em' }}/> 
                    </a>
                </p>
                <p> Vous pouvez me joindre par mail : romain.andres@etu.unicaen.fr</p>
            </div>
        </section>
    );
};

export default Contact;
