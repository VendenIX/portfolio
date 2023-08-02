import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const sections = ['#home', '#projects', '#skills','#aboutMe', '#contact'];

const Header = () => {
    const [activeSection, setActiveSection] = useState('#home');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(575));

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
        };
    }, []);

    const toggleDrawer = (isOpen) => {
        setDrawerOpen(isOpen);
    };

    const renderMenuItems = (isInDrawer = false) => (
        sections.map((section, index) => (
            <Button key={index} color="inherit" href={section} style={{ textDecoration: activeSection === section ? "underline" : "none", padding: isInDrawer ? '1em' : undefined }}>
                {section.substring(1)}
            </Button>
        ))
    );

    return (
        <section id="home">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' , marginBottom: '4em'}}>
                <AppBar position="fixed" color="primary" sx={{ maxWidth: '100%', background: '#38B3FF', paddingRight: '10em'}}>
                    <Toolbar sx={{ justifyContent: 'flex-end'}}>
                        {isMobile ? (
                            <IconButton sx={{marginRight: '-7em'}}color="inherit" onClick={() => toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        ) : renderMenuItems()}
                    </Toolbar>
                </AppBar>
                <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                    <List>
                        {renderMenuItems(true).map((item, index) => (
                            <ListItem key={index} button onClick={() => toggleDrawer(false)}>
                                {item}
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
        </section>
    );
};

export default Header;
