import React from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';

const DocPreview = ({ fileUrl }) => {
    const thumbnailPluginInstance = thumbnailPlugin();

    return (
        <div style={{ width: '200px', height: '200px' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer
                    fileUrl={fileUrl}
                    plugins={[thumbnailPluginInstance]}
                    renderPage={0}
                    defaultScale={SpecialZoomLevel.PageFit}
                />
            </Worker>
        </div>
    );
};

export default DocPreview;
