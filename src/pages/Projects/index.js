import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import ListProjects from './components/list-projects';

const Projects = () => {
    const projects = [
        {
            title: 'Application Todo List avec React et GraphQL',
            description: 'Description de votre projet ici',
            image: 'url de votre image ici',
            video: 'https://www.youtube.com/embed/tkCRqmgGa4Q',
            githubLink: 'https://github.com/https://github.com/VendenIX/Todolist-react-native/projet1'
        },
    ];

    return <ListProjects projects={projects} />;
};

export default Projects;
