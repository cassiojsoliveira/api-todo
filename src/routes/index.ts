import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Hello World from Route 2 2!" });
});

export default router;
