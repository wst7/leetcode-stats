import express from "express";
import renderCommitCard from "./cards/commit-card";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("pong")
});

app.get("/api/calendar", (req, res) => {
  const { username, theme } = req.query
  res.send(renderCommitCard())
});


app.listen(port, () => {
  console.log(`leetcode-stats listening at http://localhost:${port}`)
})