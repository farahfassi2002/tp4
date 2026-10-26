const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// 1. Protection des routes privees : verifie la validite du JWT
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Non autorise, utilisateur introuvable' });
      }
      return next();
    } catch (err) {
      // Exercice 3 : gestion explicite de l'expiration
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Votre session a expire, veuillez vous reconnecter' });
      }
      return res.status(401).json({ message: 'Non autorise, token invalide ou expire' });
    }
  }

  return res.status(401).json({ message: 'Non autorise, aucun token fourni' });
};

// 2. Controle d'acces base sur les roles (RBAC) : reserve aux admins
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Acces refuse : droits administrateur requis' });
};

module.exports = { protect, adminOnly };
