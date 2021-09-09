import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("pong")
});

app.get("/api/calendar", (req, res) => {
  const { username, theme } = req.query
  console.log(theme)
  res.send(username)
});


app.listen(port, () => {
  console.log(`leetcode-stats listening at http://localhost:${port}`)
})