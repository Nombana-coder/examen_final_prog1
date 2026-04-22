// FONCTION SLUGIFY
export function slugify(title) {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

// FONCTION TRUNCATE
export function truncate(text, maxLength) {
    if (text.length <= maxLength) return text;

    const cut = text.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(" ");

    return cut.slice(0, lastSpace) + "...";
}

// FUNCTION COUNTWORDS
export function countWords(text) {
    return text.trim().split(/\s+/).length;
}

// FUNCTION ESCAPEHTML
export function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}