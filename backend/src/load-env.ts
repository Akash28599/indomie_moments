import dotenv from "dotenv";
import path from "path";

// Base: load .env (used in production)
dotenv.config();

// Local: also load .env.local so it overrides (used when NODE_ENV=local)
if (process.env.NODE_ENV === "local") {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env.local"),
    override: true,
  });
}
