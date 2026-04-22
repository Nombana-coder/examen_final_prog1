import { articles } from "./data.js";
const totalWords = articles.reduce((sum, article) => {
    return sum + countWords(article.content);
}, 0);