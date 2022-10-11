const express = require("express");
const router = express.Router();

const {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

const { guide } = require("../middleware/authMiddleware");

router.route("/").get(guide, getGoals).post(guide, createGoals);
router.route("/:id").put(guide, updateGoals).delete(guide, deleteGoals);

module.exports = router;
