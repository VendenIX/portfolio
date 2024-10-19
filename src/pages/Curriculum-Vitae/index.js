// src/pages/Curriculum-Vitae/index.js

import DownloadIcon from '@mui/icons-material/Download';
import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CvViewer = () => {
    const [src, setSrc] = useState("/Curriculum_vitae.pdf"); // load d'abord le PDF local

    useEffect(() => {
        // try de charger le PDF distant après le rendu initial
        const remoteSrc = "https://docs.google.com/viewer?url=https://raw.githubusercontent.com/VendenIX/curriculum_vitae/main/Curriculum_vitae.pdf&embedded=true";

        // creer un test pour voir si le PDF distant est disponible
        fetch("https://raw.githubusercontent.com/VendenIX/curriculum_vitae/main/Curriculum_vitae.pdf", { method: 'HEAD' })
            .then((response) => {
                if (response.ok) {
                    // si le fichier distant est disponible, change la source
                    setSrc(remoteSrc);
                    console.log("Chargement du PDF distant ...");
                }
            })
            .catch(() => {
                // si une erreur survient, rester sur le PDF local
                console.warn("Impossible de charger le PDF distant. Affichage de la version locale.");
            });
    }, []);

    return (
        <iframe
            src={src}
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