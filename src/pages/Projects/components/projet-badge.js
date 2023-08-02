import React from 'react';
import { Grid, Card, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ListImages from './list-images';

const ProjectBadge = ({ project ,  onSelect }) => {

    const onClickOnBadge = () => {
        console.log("You clicked on the badge");
        onSelect(project.id);
    };

    const echecCuissant = () => {
        console.log("Fail !");
        console.log(onSelect)
        return null;
    };

    return (
        <Card onClick={() => onSelect ? onClickOnBadge() : echecCuissant()}>

            <ListImages images={project.images} />
            <Typography gutterBottom variant="h5" component="div">
                <h2>{project.title}</h2>
            </Typography>
        </Card>
    );
};

export default ProjectBadge;
