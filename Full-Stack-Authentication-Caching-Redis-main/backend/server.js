const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const responseTime = require("response-time");
const session = require("express-session");
const bodyParser = require("body-parser");
const Redis = require("ioredis");
let RedisStore = require("connect-redis")(session);
const compression = require("compression");
let redisClient = new Redis();
const Database = require("./configs/db.js");
require("./configs/redis");
const CONSTANTS = require("./configs/constants");
Database();
const app = express();
app.use(responseTime());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: CONSTANTS._5_MINUTES,
    },
  })
);

app.get("/", (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Tài Đẹp trai",
    timestamp: Date.now(),
  };
  return res.send(healthcheck);
});

//!import
const userRoute = require("./routes/user.route");
const Dashboard = require("./routes/dashboard");

app.use("/v1/api", userRoute);
app.use("/v1/user", Dashboard);
//!

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server is listening on port:http://localhost:${PORT}`)
);
