import React from 'react';

const PdfViewer = ({ url }) => {
  return (
    <div>
      <iframe src={url} title="PDF Viewer" width="100%" height="500" />
    </div>
  );
};

export default PdfViewer;
