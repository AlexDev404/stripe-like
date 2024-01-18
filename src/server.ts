import express, { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import config from "./config/settings.json";
import { LogServer } from "./util/Logger";
import cors from "cors";
import path from "path";
import routes from "./api/routes";
import { get_authorization } from "./api/utility/Authentication";

const app = express();
const port = process.env.PORT ?? config.server.port;
app.set("trust proxy", 2); // Number of Machines: Currently we're running on 2 Machines

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes (in milliseconds)
  limit: 200, // Limit each IP to 3000 requests per 15 minutes (200/min)
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: true, // Enable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
  statusCode: 429, // Rate limit HTTP Code
  // @ts-ignore
  keyGenerator: (req: Request, res: Response) =>
    get_authorization(req) ?? req.clientId ?? req.ip, // Otherwise, we use the IP address.
  handler: (req: Request, res: Response, next, options) => {
    res
      .status(options.statusCode)
      .json({
        status: false,
        message:
          options.message +
          ` Retry again after: ${res.getHeader("Retry-After")}s`,
      });
  },
  message: "Slow down! The resource is being rate limited.",
});

// Generate a unique ID for all the clients -- Apply this before anything else
// app.use((req, res, next) => {
//   // Add a custom field
//   // @ts-ignore --- We're supposed to get the private IP of the user
//   // res.set("clientId", uuid()); // Assign a unique ID to every client
//   next(); // This middleware is finished
// })
app.disable("x-powered-by");
app.use(cors()); // Shield the server from cross-domain requests -- apply cors before the rate limiter
app.use(express.json({limit: '10mb'})); // Enable body parsing -- enable body parsing before the rate limiter
app.use(express.urlencoded({ extended: false })); // Turn off URL encoding -- enable before rate limiting
// Apply the rate limiting middleware to all requests.
app.use(limiter); // Enable rate limiting. We don't want to get beat up
app.use(`/${config.api.API_SVERSION}`, routes); // Setup our routes
app.use("/", express.static(path.join(__dirname, "static"))); // Finally, serve our static files

// Setup our servername
const ServerName = `STRIPELIKE.${process.env.NODE_ENV ?? "dev"}.${
  require("os").hostname() ?? "container"
}.${process.platform}.${process.env.PROCESSOR_ARCHITECTURE ?? "undefined"}#${
  process.pid
}`;

app.listen(port, () => {
  LogServer(`Running on port ${port}\n`);
  LogServer(`Hello! My name is: '${ServerName}'`);
});
