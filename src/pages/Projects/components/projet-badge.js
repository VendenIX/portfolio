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
  position: 'relative', // Ajout pour gérer le pseudo-élément :hover
  transition: 'box-shadow 0.3s', // Animation de la surbrillance
  '&:hover': {
    cursor: 'pointer', // Curseur de la souris en main pointer au survol
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', // Surbrillance de l'ombre au survol
  },
});

const TitleWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const ProjectBadge = ({ project, onSelect }) => {
  const onClickOnBadge = () => {
    onSelect(project.id);
  };

  return (
    <BadgeCard onClick={() => (onSelect ? onClickOnBadge() : null)}>
      <div>
        <ListImages images={project.images}/>
        <TitleWrapper>
          <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
            {project.title}
          </Typography>
        </TitleWrapper>
      </div>
      <Typography variant="body1" component="div" sx={{ textAlign: 'center', marginTop: '8px' }}>
      </Typography>
    </BadgeCard>
  );
};

export default ProjectBadge;
