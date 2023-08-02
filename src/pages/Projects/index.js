import React, { useState } from 'react'; 
import { Card, CardContent, Typography } from '@mui/material';
import ListProjects from './components/list-projects';
import { Box } from '@mui/system';
import img1 from '../../assets/project1/p1.png';
import img2 from '../../assets/project1/p2.png';
import img3 from '../../assets/project1/p3.png';
import img4 from '../../assets/project1/p4.png';
import img5 from '../../assets/project2/p1.png';
import img6 from '../../assets/project2/p2.png';
import img7 from '../../assets/project2/p3.png';
import img8 from '../../assets/project2/p4.png';
import ProjectDetails from './components/ProjectDetails';

const Projects = ({ onSelect }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = [
        {
            id: 1,
            title: 'Application Todo List avec React et GraphQL',
            description: 'Description de votre projet ici Description de votre projet ici Description de votre projet iciDescription de votre projet iciDescription de votre projet ici Description de votre projet iciDescription de votre projet ici Description de votre projet ici Description de votre projet iciDescription de votre projet iciDescription de votre projet ici',
            images: [img1, img2, img3, img4],
            video: 'https://www.youtube.com/embed/tkCRqmgGa4Q',
            githubLink: 'https://github.com/https://github.com/VendenIX/Todolist-react-native/projet1'
        },
        {
            id: 2,
            title: 'Générateur de flore LSystem 2D & 3D',
            description: 'Description de votre projet ici',
            images: [img5, img6, img7, img8],
            video: 'https://www.youtube.com/embed/SIk_-tes1vU',
            githubLink: 'https://github.com/VendenIX/Generateur-de-flore-video-ludique'
        }
    ];

    const handleSelect = id => {
        const project = projects.find(p => p.id === id);
        setSelectedProject(project);
    };

    const handleClose = () => {
        setSelectedProject(null);
    };


    return (
        <section id="projets" style={{ minHeight: '100vh'}}>
            {selectedProject ? (
                <ProjectDetails 
                    title={selectedProject.title}
                    description={selectedProject.description}
                    images={selectedProject.images}
                    video={selectedProject.video}
                    githubLink={selectedProject.githubLink}
                    onClose={handleClose}
                />
            ) : (
                <ListProjects projects={projects} onSelect={handleSelect} />
            )}
        </section>
    );
};

export default Projects;
