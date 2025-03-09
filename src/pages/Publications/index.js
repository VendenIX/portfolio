import LanguageIcon from '@mui/icons-material/Language';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import publicationsData from '../../assets/publications.json';

const Publications = () => {
  const IMAGE_BASE_URL = '/portfolio/';
  return (
    <section id="publications" style={{ padding: '2em 0' }}>
      <Typography variant="h4" style={{ margin: '1em 2em' }}>
        Publications
      </Typography>
      <Box display="flex" overflow="auto" padding="1em 2em">
        {publicationsData.map(pub => (
          <Card
            key={pub.id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'stretch', // étend les enfants sur toute la hauteur
              marginRight: '1em',
              minWidth: '100%',
              boxShadow: 3,
              borderRadius: '1em',
              overflow: 'hidden',
              height: { xs: 'auto', sm: '250px' } // hauteur fixe en desktop
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: '100%', sm: '200px' },
                height: { xs: '200px', sm: '250px' } // même hauteur que le card
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                image={`${IMAGE_BASE_URL}${pub.image}`}
                alt={pub.title}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1em' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h5" component="div">
                  {pub.title}
                </Typography>
                <Typography variant="caption" display="block" sx={{ marginBottom: '0.5em' }}>
                  DOI: {pub.doi}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify' }}>
                  {pub.abstract}
                </Typography>
              </CardContent>
              <Box sx={{ padding: '0.5em 1em', textAlign: 'right' }}>
                <Button
                  variant="contained"
                  onClick={() => window.open(pub.articleUrl, '_blank')}
                  sx={{ minWidth: 'auto', padding: '0.5em', borderRadius: '1em', textTransform: 'none' }}
                >
                  <LanguageIcon />
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </section>
  );
};

export default Publications;