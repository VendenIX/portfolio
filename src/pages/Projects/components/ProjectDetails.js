import Close from '@mui/icons-material/Close';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

const ProjectDetails = ({title, description, technologies, images, video, githubLink, onClose}) => {

    return (
        <Box 
            sx={{ 
                backgroundColor: "#f0f0f0", 
                padding: "2em", 
                borderRadius: "2em", 
                margin: "1em 5%", 
                maxWidth: '100%', 
                maxHeight: '100%', 
                overflow: 'auto',
                position: 'relative' 
            }}
        >
            <IconButton 
                onClick={onClose} 
                sx={{ 
                    position: 'absolute', 
                    top: '10px', 
                    left: '10px', 
                    zIndex: 1000, 
                    backgroundColor: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#eeeeee', 
                    }
                }}
            >
                <Close />
            </IconButton>

            <Typography 
                variant="h2" 
                component="div" 
                sx={{ 
                    marginBottom: "1em", 
                    color: "#38B3FF", 
                    fontSize: { xs: '1.5em', sm: '2em', md: '2.5em' }, 
                    textAlign: 'center' 
                }}
            >
                {title}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            marginBottom: "1em", 
                            color: "#000",
                            fontSize: { xs: '0.9em', sm: '1em' }, 
                            textAlign: 'justify'
                        }}
                    >
                        {description}
                    </Typography>
                </Box>
            </Stack>

            <Stack 
                direction="row" 
                spacing={1} 
                alignItems="center" 
                sx={{ 
                    marginBottom: "1em", 
                    flexWrap: 'wrap', 
                    justifyContent: { xs: 'center', sm: 'flex-start' }
                }}
            >
                {technologies.map((tech, index) => (
                    <Typography 
                        key={index} 
                        variant="body2" 
                        sx={{ 
                            backgroundColor: "#38B3FF", 
                            color: "#fff", 
                            padding: "0.3em 0.8em", 
                            borderRadius: "0.5em",
                            fontSize: { xs: '0.7em', sm: '0.9em' }, 
                            marginBottom: '0.5em' 
                        }}
                    >
                        {tech}
                    </Typography>
                ))}
            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: '1em',
                    overflow: 'hidden',
                    margin: '1em 0',
                    position: 'relative',
                    paddingBottom: '56.25%', 
                    height: 0,
                }}
            >
                <iframe 
                    src={video}
                    title="Demo projet react-native Todo app (CRUD w/GraphQL)" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '1em'
                    }}
                />
            </Box>

            <Button 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="contained" 
                color="primary"
                sx={{
                    fontSize: { xs: '0.8em', sm: '1em' },
                    width: { xs: '100%', sm: 'auto' }, 
                    marginTop: '1em'
                }}
            >
                Github Repository
            </Button>
        </Box>
    );
};

export default ProjectDetails;