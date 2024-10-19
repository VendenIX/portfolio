import DownloadIcon from '@mui/icons-material/Download';
import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const CvViewer = ({ setPdfHeight }) => {
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

  const onPageLoadSuccess = (page) => {
    const { height } = page.getViewport({ scale: 1 });
    console.log(`Hauteur de la page : ${height}px`);
    // convertir la hauteur en `em`, en supposant que 1em = 16px
    setPdfHeight(height / 16);
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '60%', padding: '0 20%', marginBottom: '20vh', paddingRight: '25em' }}>
        <Document
          file={filePath}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={currentPage}
            width={window.innerWidth * 0.6} // largeur à 60% de la largeur totale
            onLoadSuccess={onPageLoadSuccess} 
          />
        </Document>
      </div>
    </div>
  );
};

const CurriculumVitae = () => {
  const localDownloadPath = `${window.location.origin}/portfolio/Curriculum_vitae.pdf`;
  const [pdfHeightEm, setPdfHeightEm] = useState(0);

  return (
    <section id="cv" style={{ padding: '5em', minHeight: `${pdfHeightEm * 1.50}em` }}>
      <div>
        <Typography variant="h4" style={{ marginBottom: '1em' }}>Curriculum Vitae</Typography>
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
        <CvViewer setPdfHeight={setPdfHeightEm} />
      </div>
    </section>
  );
};

export default CurriculumVitae;