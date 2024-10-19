import { Card, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import ListImages from './list-images';

const IMAGE_BASE_URL = '/portfolio/';

const BadgeCard = styled(Card)({
    width: '80%', // Pour que la carte occupe toute la largeur du carrousel
    margin: 'auto',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '1em',
    position: 'relative', // Ajout pour gérer le pseudo-élément :hover
    transition: 'box-shadow 0.3s', // Animation de la surbrillance
    '&:hover': {
      cursor: 'pointer', // Curseur de la souris en main pointer au survol
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', // Surbrillance de l'ombre au survol
    },
    '@media (max-width:800px)': {
      width: '80%', 
    },
    '@media (max-width:400px)': {
      width: '90%'
    }
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

  // Construire les chemins complets des images
  const imagePaths = project.images.map(img => `${IMAGE_BASE_URL}${img}`);

  return (
    <BadgeCard onClick={() => (onSelect ? onClickOnBadge() : null)}>
      <div>
        <ListImages images={imagePaths} />
        <TitleWrapper>
          <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
            {project.title}
          </Typography>
        </TitleWrapper>
      </div>
      <Typography variant="body1" component="div" sx={{ textAlign: 'center', marginTop: '8px'  }}>
      </Typography>
    </BadgeCard>
  );
};

export default ProjectBadge;