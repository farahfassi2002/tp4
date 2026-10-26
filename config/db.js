const mongoose = require('mongoose');

async function connectDB(uri) {
    if (!uri) {
        throw new Error("L'URI MongoDB est manquant dans les variables d'environnement (. env)"
        );
    }

    await mongoose.connect(uri, {
        autoIndex: true
    });
    console.log('Connexion a MongoDB Atlas reussie avec succes !');

}

module.exports = connectDB;