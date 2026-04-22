import fs from 'fs';
import { articles } from './data.js';
import { layout } from './layout.js';
import { slugify, truncate, countWords, escapeHTML } from './stringUtils.js';


/**
 * Création du dossier de sortie
 * 
 */
const dist = './dist';
if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
}


/**
 * =========================================================
 * 🔧 PARTIE À COMPLÉTER 
 * =========================================================
 */


/**
 * Logique pour générer la page STATISTIQUES
 */
function generateStatsPage(data) {
/** * stockez dans une variable qui s'appelle nbrArticles le
 * nombre d'articles dans le blog
 */
    const nbrArticles = data.length;

/** * Implémentez ci-dessous la logique qui permet de compter le
 * nombre total de mots dans tout le blog puis stockez le
 * résultat dans une variable qui s’appelle totalWords
 */
    const totalWords = data.reduce((acc, article) => {
        const fullText = `${article.content}`;
        const wordCount = fullText.split(/\s+|’/).filter(word => word.length > 0).length;
        return acc + wordCount;
    },0);

/**
 * Implémentez ci-dessous la logique qui permet de calculer le
 * nombre moyenne de mots par article puis stockez le
 * résultat dans une variable qui s’appelle avgWords
 */
    const avgWords = Math.round(totalWords / nbrArticles);    

/**
 * Implémentez ci-dessous la logique qui permet de trouver
 * l'auteur le plus actif (c’est-à-dire, celui qui a écrit le
 * plus d’article dans le blog) puis stockez le résultat dans
 * une variable qui s’appelle topAuthor
 */
    function mostActiveAuthor(data) {
        const authorCount = {};
        data.forEach(article => {
            authorCount[article.author] = (authorCount[article.author] || 0) + 1;
        });
        
        let topAuthor = null;
        let maxCount = 0;
        for (const author in authorCount) {
            if (authorCount[author] > maxCount) {
                maxCount = authorCount[author];
                topAuthor = author;
            }
        }
        return topAuthor;
    }
    const topAuthor = mostActiveAuthor(data);

    const body = `
        <h1>Analyse du Blog</h1>
        <div class="stats-box">
            <div class="stat-item"><strong>${nbrArticles}</strong><br>Articles</div>
            <div class="stat-item"><strong>${totalWords}</strong><br>Mots au total</div>
            <div class="stat-item"><strong>${avgWords}</strong><br>Mots / article</div>
            <div class="stat-item"><strong>${topAuthor}</strong><br>Auteur principal</div>
        </div>
    `;
    return layout("Statistiques", body);


}


/**
 * Génère la page ARCHIVES
 */
function generateArchivesPage(data) {
/**
 * Implémentez ci-dessous la logique qui permet de lister
 * tous les articles dans le blog avec la date de parution de chaque                       * article, le lien qui permet de mener à l’article et le nombre *total de mots dans l’article en question puis stocker le 
 * résultat dans une variable qui s’appelle list
 */
    const list = data.map(article => {
        return `
            <li>
                <strong>${article.date}</strong> :
                <a href="${slugify(article.title)}.html">${escapeHTML(article.title)}</a>
                (${countWords(article.content)} mots)
            </li>`;
    }).join("");

    return layout("Archives", `<h1>Tous les articles</h1><ul>${list}</ul>`);
}


// La fonction build pour la génération du site
export const build = () => {
    // Page Accueil
    const indexBody = `<h1>Dernières publications</h1>` + articles.map(a => `
        <div class="card">
            <h2>${escapeHTML(a.title)}</h2>
            <p>${truncate(a.content, 100)}</p>
            <a href="${slugify(a.title)}.html">Lire l'article</a>
        </div>
    `).join('');
    fs.writeFileSync(`${dist}/index.html`, layout("Accueil", indexBody));


    // Page Archives
    fs.writeFileSync(`${dist}/archives.html`, generateArchivesPage(articles));


    // Page Stats
    fs.writeFileSync(`${dist}/stats.html`, generateStatsPage(articles));


    // Page À Propos
    fs.writeFileSync(`${dist}/a-propos.html`, layout("À Propos",`<h1>À propos</h1><p>Ce projet démontre un des potentiels utilisation de Node.js. Finalement, la limite restera toujours votre créativité et imagination. Cela dit, il faut Penser, Travailler et Impacter ! </p>`));


    // Pages Articles individuelles
    articles.forEach(art => {
        const content = `
            <img src="data:image/png;base64,${art.image}" style="width:100%; border-radius:8px;">
            <h1>${escapeHTML(art.title)}</h1>
            <p><em>Par ${art.author} le ${art.date}</em></p>
            <div style="background: white; padding: 20px; border-radius: 8px;">${art.content}</div>
        `;
        fs.writeFileSync(`${dist}/${slugify(art.title)}.html`, layout(art.title, content));
    });


    console.log("✨ Site web statique généré avec succès dans le répertoire /dist !");
}
