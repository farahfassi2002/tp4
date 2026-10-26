const express = require("express");
const router = express.Router();
const {
  getAllArticles, getArticleById, getMyArticles,
  createArticle, updateArticle, deleteArticle
} = require("../controllers/articleController");
const { protect } = require("../middlewares/authMiddleware");

// Consultation publique
router.get("/", getAllArticles);

// Exercice 2 : declaree AVANT "/:id", sinon "my-articles" serait pris pour un id
router.get("/my-articles", protect, getMyArticles);

router.get("/:id", getArticleById);

// Ecriture protegee par JWT
router.post("/", protect, createArticle);
router.put("/:id", protect, updateArticle);
router.delete("/:id", protect, deleteArticle);

module.exports = router;
