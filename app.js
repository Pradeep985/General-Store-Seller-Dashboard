const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/", itemRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT);
