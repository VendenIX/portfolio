import React from 'react';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ListImages from './list-images';

const BadgeCard = styled(Card)({
  width: '45%', // Pour que la carte occupe toute la largeur du carrousel
  margin: 'auto',
  height: '100%',
  overflow: 'hidden',
  borderRadius: '1em',
  // Ajoutez d'autres styles personnalisés ici si nécessaire
});

const ProjectBadge = ({ project, onSelect }) => {
  const onClickOnBadge = () => {
    onSelect(project.id);
  };

  return (
    <BadgeCard onClick={() => (onSelect ? onClickOnBadge() : null)}>
      <ListImages images={project.images}/>
      <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
        {project.title}
      </Typography>
    </BadgeCard>
  );
};

export default ProjectBadge;
