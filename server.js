import http from 'http';
import path from 'path';
import fs from 'fs';


export const startServer = (port = 3000) => {
    const DIST_DIR = './dist';


    // Création du serveur
    const SERVER = http.createServer((request, response) => {
        let filePath = request.url === '/' ? '/index.html' : request.url;
        const fullPath = path.join(process.cwd(), DIST_DIR, filePath);


        fs.readFile(fullPath, (err, content) => {
            if (err) {
                response.writeHead(404);
                response.end('Erreur 404 : Page introuvable !');
                return;
            }
            // Détection extension
            const EXT = path.extname(fullPath);


            response.writeHead(200, { 'Content-Type': EXT === '.html' ? 'text/html' : 'text/plain' });


             // Envoi du contenu
            response.end(content);
        });
    });


// Démarrage du serveur
    SERVER.listen(port, () => {
        console.log(`🌍 Serveur démarré sur http://localhost:${port}`);
        console.log(`💡 Appuyez sur Ctrl+C pour arrêter.`);
    });
};
