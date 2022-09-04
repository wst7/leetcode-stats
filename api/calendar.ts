import { VercelRequest, VercelResponse } from "@vercel/node";

import fetcher from "../src/fetchers/commit-fetcher";
import Card from "../src/cards/commit-card";

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const { username, theme } = req.query;
    if (!username) throw Error("Invalid username");

    const data = await fetcher(username as string);
    console.log(JSON.stringify(data));
    const card = new Card(data, theme as any);
    const svg = card.render();
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "s-max-age=60, stale-while-revalidate");
    res.status(200).send(svg);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
