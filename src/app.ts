import express from "express";
import fetcher from "./fetchers/commit-fetcher";
import renderCommitCard from "./cards/commit-card";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("pong");
});

app.get("/api/calendar", async (req, res) => {
  const { username, theme } = req.query;
  const data = await fetcher(username as string);
  res.send(
    renderCommitCard({
      theme,
      data,
    })
  );
});

app.listen(port, () => {
  console.log(`leetcode-stats listening at http://localhost:${port}`);
});
