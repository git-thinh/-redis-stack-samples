const express = require("express");
const morgan = require("morgan");

const PORT = 5001;

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const redisSub = require("./src/databases/init.redisSub");

redisSub.initializeSubscriptions(["userOrder", "userRefund", "jacker_tuan"]);

redisSub.registerHandler("userOrder", (message) => {
  console.log(message);
});

redisSub.registerHandler("userRefund", (message) => {
  console.log(message);
});

redisSub.registerHandler("jacker_tuan", (message) => {
  console.log(message);
});

app.listen(PORT, () => {
  console.info(`💸 Api backend start with http://localhost:${PORT} 🔥`);
});
