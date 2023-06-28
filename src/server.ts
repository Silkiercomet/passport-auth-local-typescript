import express from "express";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import extractStringEnvVar from "./controllers/extractEnv";
import db from "./db/db";
import router from "./routes/authRoutes";
import passportConfig from "./controllers/passport";
import { errorHandler } from "./controllers/errorHandler";
const app = express();

app.use(cors());
dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: extractStringEnvVar("JWT"),
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: extractStringEnvVar("MONGO_URL"),
      ttl: 3600, // Session TTL (optional)
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});
app.use("/api/auth", router);
app.use(errorHandler)

app.listen(extractStringEnvVar("PORT") || 3000, () => {
  try {
    db();
    passportConfig(passport);
    console.log("app conected to mongodb");
  } catch (err) {
    console.log(err);
  }
});

export default app
