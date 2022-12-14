require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database/database");

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

const userRoute = require("./routes/users.route");
const authRoute = require("./routes/auth.route");
const tweetsRoute = require("./routes/tweets.route");
const swaggerRoute = require("./routes/swagger.router");

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/tweets", tweetsRoute);
app.use("/api-docs", swaggerRoute);

app.get("/", (req, res) =>{
    res.send({ message: "Hello, world!" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});