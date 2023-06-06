const express = require("express");
require("dotenv").config();
require("./models/db");
const cors = require("cors");
const userRouter = reqire('./routes/user');
const bodyParser = require("body-parser");


const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.json());
app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);