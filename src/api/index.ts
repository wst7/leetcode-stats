import express from "express";
import fetcher from "../fetchers/commit-fetcher";
import Card from "../cards/commit-card";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/calendar", async (req, res) => {
  try {
    const { username, theme } = req.query;
    const data = await fetcher(username as string);
    const card = new Card(data, theme as any);
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "s-max-age=60, stale-while-revalidate");
    res.status(200).send(card.render());
  } catch (error) {
    res.status(400).send('Error');
  }
 
});

app.listen(port, () => {
  console.log(`leetcode-stats listening at http://localhost:${port}`);
});
