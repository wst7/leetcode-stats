export const config = {
  runtime: "edge",
};

import fetcher from "../src/fetchers/commit-fetcher";
import CommitCard from "../src/cards/commit-card";

export default async function (req) {
  try {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')
    const theme = searchParams.get('theme')
    if (!username) throw Error("Invalid username");

    const data = await fetcher(username as string);

    const card = new CommitCard(data, theme as any, username);
    const svg = card.render();
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "s-max-age=60, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error('api error', error);
    return new Response(error.message, { status: 500 });
  }
}
