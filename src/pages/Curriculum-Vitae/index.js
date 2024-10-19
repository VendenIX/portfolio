import DownloadIcon from '@mui/icons-material/Download';
import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const CvViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/portfolio/pdf.worker.min.mjs`;
  }, []);

  const filePath = `${window.location.origin}/portfolio/Curriculum_vitae.pdf`;
  console.log("Chemin complet du fichier PDF :", filePath);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // cycle entre les pages toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage % 2) + 1);
    }, 5000);

    // nettoyage de l'intervalle quand le composant se démonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em'}}>
      <div style={{ height: '160vh', width: '60%', padding: '0 20%', overflow: 'hidden', margin: '0 auto', transform: 'translateX(-5%)'}}>
        <Document
          file={filePath}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={currentPage}
            height={window.innerHeight} 
            width={window.innerWidth * 0.6} // 60% de la largeur totale de l'écran
          />
        </Document> 
      </div>
    </div>
  );
};

const CurriculumVitae = () => {
  const localDownloadPath = `${window.location.origin}/portfolio/Curriculum_vitae.pdf`;

  return (
    <section id="cv" style={{ padding: '6em', minHeight: '110vh' }}>
      <div>
        <Typography variant="h4" style={{marginTop: '2em'}}>Curriculum Vitae</Typography>
        {/* bouton pour Télécharger le CV */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          href={localDownloadPath} // path local pour le téléchargement
          download
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: '1em 0' }}
        >
          Télécharger le CV
        </Button>
        <CvViewer />
      </div>
    </section>
  );
};

export default CurriculumVitae;