import cors from "cors";
import nc from "next-connect";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .head(async (req, res) => {
    const query = new URL(req.url ?? '/', `http://${req.headers.host}`).searchParams;
    const url = query.get('url');
    if(!url) return res.writeHead(404).end();
    const response = await fetch(url, { method: 'head' })
      .catch(() => null);
    res.writeHead(response?.ok ? 200 : 404).end();
  });

export default handler;
