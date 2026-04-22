# Générateur de site statique Node.js

## Objectif du projet
Ce projet crée un site web statique à partir d’un jeu d’articles JavaScript. Il génère des pages HTML dans le dossier `dist`, puis lance un serveur HTTP local pour servir ces pages. L’objectif est de montrer comment utiliser Node.js et les modules ESM pour construire un générateur de site simple et illustrer des concepts tels que la génération de pages, le traitement de données, et la création d’un mini-serveur web.

## Fonctionnement général
1. `app.js` démarre l’application.
2. `builder.js` construit les pages HTML dans `dist/`.
3. `data.js` contient le contenu des articles.
4. `layout.js` fournit la structure HTML commune à toutes les pages.
5. `stringUtils.js` propose des helpers de texte pour transformer et sécuriser le contenu.
6. `server.js` lance un serveur local pour afficher le contenu généré.
7. `imageUtils.js` contient des fonctions utilitaires pour encoder/décoder des images en Base64.

Le dossier `dist/` contient les fichiers HTML générés et est ignoré par Git grâce à `.gitignore`.

## Fichiers et fonctions

### `app.js`
- Point d’entrée principal.
- Importé de `builder.js` et `server.js`.
- Appelle `build()` pour générer le site statique.
- Appelle `startServer()` pour lancer le serveur local.

### `builder.js`
- Génère les pages HTML dans `dist/`.
- Crée le dossier `dist` si nécessaire.
- `build()` réalise les actions suivantes :
  - génère `index.html` avec les cartes des articles,
  - génère `archives.html` avec la liste complète des articles et leur date,
  - génère `stats.html` avec des statistiques du blog,
  - génère `a-propos.html` avec une page de présentation,
  - génère une page individuelle pour chaque article.
- Utilise `generateStatsPage()` pour calculer :
  - nombre total d’articles,
  - nombre total de mots,
  - moyenne de mots par article,
  - auteur le plus actif.
- Utilise `generateArchivesPage()` pour construire la liste des articles avec date, lien et nombre de mots.

### `data.js`
- Contient le tableau `articles` exporté.
- Chaque article contient :
  - `title`,
  - `image`,
  - `content`,
  - `author`,
  - `date`.
- Les images sont stockées en Base64 dans la propriété `image`.
- Les données sont utilisées par `builder.js` pour générer les pages individuelles.

### `layout.js`
- Exporte la fonction `layout(title, content)`.
- Retourne le HTML de base commun à toutes les pages.
- Inclut le `<head>`, un menu de navigation et un footer.
- Permet de centraliser le style et la structure du site.

### `stringUtils.js`
- Définit des fonctions de transformation de texte :
  - `slugify(title)` pour transformer un titre en nom de fichier URL-friendly,
  - `truncate(text, limit)` pour afficher un extrait court,
  - `countWords(text)` pour compter les mots d’un contenu,
  - `escapeHTML(text)` pour sécuriser les textes contre le HTML injecté.
- Ces helpers sont utilisés par `builder.js` pour produire du contenu lisible et sûr.

### `server.js`
- Exporte `startServer(port = 3000)`.
- Crée un serveur HTTP simple avec `http.createServer`.
- Sert les fichiers HTML statiques du dossier `dist/`.
- Pour `/`, il sert `index.html`.
- Pour les autres URL, il tente de lire le fichier correspondant dans `dist`.
- Retourne une erreur 404 si le fichier n’existe pas.

### `imageUtils.js`
- Contient deux fonctions :
  - `encodeImageToBase64(imagePath)` pour convertir une image en chaîne Base64,
  - `decodeBase64ToImage(base64String, outputPath)` pour enregistrer une image à partir d’une chaîne Base64.
- Ce fichier illustre l’utilisation de `fs` et `path` pour manipuler des fichiers.
- Un appel direct vers `decodeBase64ToImage(...)` est présent dans le fichier, créant un fichier `output.png`.

### `package.json`
- Déclare le projet sous le nom `website-generator`.
- Définit la version `1.0.0`.
- Indique `type: "module"` pour activer les imports ES.

## Installation et exécution
1. Installer Node.js (version moderne avec support ESM).
2. Exécuter dans le dossier du projet :
   - `node app.js`
3. Ouvrir dans le navigateur :
   - `http://localhost:3000`

## Notes importantes
- Le dossier `dist/` est généré automatiquement et n’est pas suivi par Git.
- Si vous modifiez `data.js`, relancez `node app.js` pour regénérer les pages.
- `server.js` ne sert que des fichiers HTML et ne gère pas de CSS ou JS externes autre que le HTML produit.

## Résumé
Ce projet vise à démontrer un générateur de site statique simple en Node.js :
- génération HTML automatique,
- structure modulaire claire,
- utilisation des modules ESM,
- mini-serveur pour tester le résultat localement.
