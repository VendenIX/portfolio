import React from 'react';
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
const Projects = () => {
    const projects = [
        {
            title: 'Application Todo List avec React et GraphQL',
            description: 'Description de votre projet ici',
            images: [img1, img2, img3, img4],
            video: 'https://www.youtube.com/embed/tkCRqmgGa4Q',
            githubLink: 'https://github.com/https://github.com/VendenIX/Todolist-react-native/projet1'
        },
        {
            title: 'Générateur de flore LSystem 2D & 3D',
            description: 'Description de votre projet ici',
            images: [img5, img6, img7, img8],
            video: 'https://www.youtube.com/embed/SIk_-tes1vU',
            githubLink: 'https://github.com/VendenIX/Generateur-de-flore-video-ludique'
        }
    ];

    return(
            <ListProjects projects={projects} />
    );
};

export default Projects;
