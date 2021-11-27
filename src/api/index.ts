import express from "express";
import fetcher from "../fetchers/commit-fetcher";
import Card from "../cards/commit-card";

const app = express();
const port = 3000;

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

app.get("/api/calendar", async (req, res) => {
  const { username, theme } = req.query;
  const data = await fetcher(username as string);
  const card = new Card(data, theme as any);
  res.send(card.render());
});


app.listen(port, () => {
  console.log(`leetcode-stats listening at http://localhost:${port}`);
});
