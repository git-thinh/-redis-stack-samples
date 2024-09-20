const express = require("express");
const morgan = require("morgan");
const { v4: uuidv4 } = require('uuid');

const redisService = require("./src/databases/init.redisPub");
const { default: axios } = require("axios");

const PORT = 5000
const app = express();


app.use(express.json());
app.use(morgan('dev'));

require('./src/databases/init.redisPub')


const router = app.use(express.Router());

router.get('/hello', async (req, res) => {
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const todos = response.data;

    redisService.publish(`user.${todos[0].id}`, todos)
    res.status(200).json({
        message:"OK publish success"
    })
});




app.listen(PORT, () => {
    console.info(`💸 Api backend start with http://localhost:${PORT} 🔥`);
});




