// src/pages/Curriculum-Vitae/index.js

import React from 'react';
import { Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const CvViewer = () => {
    return (
        <iframe
            src="https://docs.google.com/viewer?url=https://raw.githubusercontent.com/VendenIX/curriculum_vitae/main/Curriculum_vitae.pdf&embedded=true"
            style={{ width: '80%', height: '90vh', margin: 'auto', display: 'block', border: 'none' }}
            title="CV"
        />
    );
};

const CurriculumVitae = () => {
    return (
        <section id="cv" style={{ padding: '5em', minHeight: '110vh' }}>
            <div>
                <Typography variant="h4" style={{ marginBottom: '1em' }}>Curriculum Vitae</Typography>
                <CvViewer />
            </div>
            {/* Bouton pour Télécharger le CV */}
            <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            href="https://raw.githubusercontent.com/VendenIX/curriculum_vitae/main/Curriculum_vitae.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: '1em 0' }}
            >
                Télécharger le CV
            </Button>
        </section>
    );
};

export default CurriculumVitae;