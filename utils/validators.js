const estNonVide = (chaine) => typeof chaine === 'string' && chaine.trim().length > 0;
const estEmailValide = (email) => {
    return typeof email === 'string' && email.includes('@') && email.includes('.');
};

module.exports = { estNonVide, estEmailValide };