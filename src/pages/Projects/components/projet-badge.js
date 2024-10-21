import { Card, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import ListImages from './list-images';

const IMAGE_BASE_URL = '/portfolio/';

const BadgeCard = styled(Card)({
    width: '80%',
    margin: 'auto',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '1em',
    position: 'relative', 
    transition: 'box-shadow 0.3s', 
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
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

const ImageWrapper = styled('div')({
  width: '100%',
  height: '23em',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  }
});

const ProjectBadge = ({ project, onSelect }) => {
  const onClickOnBadge = () => {
    onSelect(project.id);
  };

  const imagePaths = project.images.map(img => `${IMAGE_BASE_URL}${img}`);

  return (
    <BadgeCard onClick={() => (onSelect ? onClickOnBadge() : null)}>
      <div>
        <ImageWrapper>
          <ListImages images={imagePaths} />
        </ImageWrapper>
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