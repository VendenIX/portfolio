import React, { useState, useEffect } from 'react'; 
import { Typography, Button } from '@mui/material';
import ListProjects from './components/list-projects';
import { Box } from '@mui/system';
import ProjectDetails from './components/ProjectDetails';
import projectsData from '../../assets/projects.json';

// Définir la base URL pour les images
const IMAGE_BASE_URL = '/portfolio/';

const Projects = ({ onSelect }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleSelect = id => {
        const project = projectsData.find(p => p.id === id);
        setSelectedProject(project);
    };

    const handleClose = () => {
        setSelectedProject(null);
    };

    const redirectToGitHub = () => {
        window.open('https://github.com/VendenIX?tab=repositories', '_blank');
    };

    return (
        <section id="projects" style={{ minHeight: '110vh' }}>
            {selectedProject ? (
                <ProjectDetails 
                    title={selectedProject.title}
                    description={selectedProject.description}
                    technologies={selectedProject.technologies}
                    images={selectedProject.images.map(img => `${IMAGE_BASE_URL}${img}`)}
                    video={selectedProject.video}
                    githubLink={selectedProject.githubLink}
                    onClose={handleClose}
                />
            ) : (
                <div>
                    <div style={{ padding: '20px', marginLeft: "5em" }}>
                        <Typography style={{ marginTop: '2em' }} variant="h4">Projects</Typography>
                    </div>
                    <ListProjects projects={projectsData} onSelect={handleSelect} />
                    <Box display="flex" justifyContent="center" style={{ marginTop: '5em' }} mt={3}>
                        <Button variant="contained" color="primary" onClick={redirectToGitHub}>
                            See all projects on GitHub
                        </Button>
                    </Box>
                </div>
            )}
        </section>
    );
};

export default Projects;