import { VercelRequest, VercelResponse } from "@vercel/node";

import fetcher from "../src/fetchers/commit-fetcher";
import Card from "../src/cards/commit-card";

export default function (req: VercelRequest, res: VercelResponse) {
  try {
    const { username, theme } = req.query;
    fetcher(username as string).then((data) => {
      console.log(data)
      const card = new Card(data, theme as any);
      // console.log(card.render())
      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader("Cache-Control", "s-max-age=60, stale-while-revalidate");
      res.status(200).send(card.render());
    });
  } catch (error) {
    res.status(400).send("Error");
  }
}
