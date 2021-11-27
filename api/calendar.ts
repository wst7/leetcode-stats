import { VercelRequest, VercelResponse } from "@vercel/node";

import fetcher from "../fetchers/commit-fetcher";
import Card from "../cards/commit-card";

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const { username, theme } = req.query;
    const data = await fetcher(username as string);
    const card = new Card(data, theme as any);
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "s-max-age=60, stale-while-revalidate");
    res.status(200).send(card.render());
  } catch (error) {
    res.status(400).send("Error");
  }
}