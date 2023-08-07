const pool = require("../configs/db.config");
const express = require("express");
const router = express.Router();

router.delete("/:workoutId", async (req, res) => {
  const workoutId = req.params.workoutId;
  try {
    const query = "DELETE FROM log WHERE id = $1";
    await pool.query(query, [workoutId]);
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;