const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { PDFDocument } = require('pdf-lib');

async function generateImageThumbnail(filePath, outputFilePath) {
  await sharp(filePath)
    .resize({ width: 200 }) // Ajusta el tamaño de la miniatura según tus necesidades
    .toFile(outputFilePath);
}

async function generatePDFThumbnail(filePath, outputFilePath) {
  const pdfBuffer = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  
  const pngImageBytes = await firstPage.renderToPng({
    scale: 0.5, // Ajusta la escala según tus necesidades
  });

  fs.writeFileSync(outputFilePath, pngImageBytes);
}

async function generateThumbnail(filePath, outputFilePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.pdf') {
    await generatePDFThumbnail(filePath, outputFilePath);
  } else if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
    await generateImageThumbnail(filePath, outputFilePath);
  } else {
    throw new Error('Unsupported file type');
  }
}

module.exports = generateThumbnail;
