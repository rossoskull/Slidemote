import React from 'react'
import { pdfjs, Document, Page } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const Present = ({filePath, pageNumber, onDocumentLoadSuccess, handlePageIncrease, handlePageDecrease}) => {
  return (
    <div>
      <Document
        file={filePath}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <button onClick={handlePageDecrease}>-</button>
      <button onClick={handlePageIncrease}>+</button>
    </div>
  )
}

export default Present