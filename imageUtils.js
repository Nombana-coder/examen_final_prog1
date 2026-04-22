import fs from 'fs';
import path from 'path';

// ENCODAGE
export function encodeImageToBase64(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64String = imageBuffer.toString('base64');
    const extension = path.extname(imagePath).slice(1);
    return `data:image/${extension};base64,${base64String}`;
}

// DECODAGE
export function decodeBase64ToImage(base64String, outputPath) {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(outputPath, imageBuffer);
    console.log(`✅ Image sauvegardée : ${outputPath}`);
}
