// server.ts
import express, { Request, Response } from "express";
import next from "next";
import { createCmdMessage } from "./helpers";
// import createBaseExpressMiddleware from "./middlewares";

const dev: boolean = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/api/data", (req: Request, res: Response) => {
    res.json({ message: "Hello from the custom server!" });
  });

  // Fallback to Next.js default request handler for all other routes
  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

  server.listen(PORT, (err?: any) => {
    if (err) throw err;
    createCmdMessage({
      type: "success",
      message: `> App is running on http://localhost:${PORT}`,
    });
  });
});
