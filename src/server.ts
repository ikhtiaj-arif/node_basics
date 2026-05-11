import { createServer, IncomingMessage, Server } from "node:http";
import { routeHandler } from "./routes/route";

const server: Server = createServer((req: IncomingMessage, res) => {
  routeHandler(req, res);
});

server.listen(5500, () => {
  console.log("server running on port 5500");
});
