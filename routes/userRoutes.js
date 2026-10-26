const express = require("express");
const router = express.Router();
const {
  registerUser, loginUser, getUserProfile, getAllUsers,
  updatePassword, promoteUser
} = require("../controllers/userController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// Routes d authentification publiques
router.post("/register", registerUser);
router.post("/login", loginUser);

// Routes privees (JWT requis)
router.get("/profile", protect, getUserProfile);
router.put("/update-password", protect, updatePassword); // Exercice 1

// Routes reservees aux administrateurs (JWT valide + role admin)
router.get("/", protect, adminOnly, getAllUsers);
router.put("/:id/role", protect, adminOnly, promoteUser); // Exercice 2

module.exports = router;
