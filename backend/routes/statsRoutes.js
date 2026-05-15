const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addStats,
  getStats,
} = require("../controllers/statsController");

router.post(
  "/txn-stats",
  authMiddleware,
  addStats
);

router.get(
  "/dashboard-stats",
  authMiddleware,
  getStats
);

module.exports = router;