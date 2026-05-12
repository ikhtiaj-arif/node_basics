import { createServer, IncomingMessage, Server } from "node:http";
import { routeHandler } from "./routes/route";
import config from "./config";

const server: Server = createServer((req: IncomingMessage, res) => {
  routeHandler(req, res);
});

server.listen(config.port, () => {
  console.log(`server running on port ${config.port}`);
});
