const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "http://localhost:3333" }));
//app.use(cors({ origin: 'https://allchat-web.herokuapp.com' }))
app.use(express.json());
app.use(routes);

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

export default server;
