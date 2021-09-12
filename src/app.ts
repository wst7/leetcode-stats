import express, { Request, Response } from "express";
import fetcher from "./fetchers/commit-fetcher";
import renderCommitCard from "./cards/commit-card";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("pong");
});

app.get("/api/calendar", async (req, res) => {
  const { username, theme }: Request["query"] = req.query;
  const data = await fetcher({ username });
  console.log("data", data)
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
