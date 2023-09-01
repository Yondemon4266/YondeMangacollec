const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const cors = require("cors"); 

// ROUTE FILES
const userRoutes = require("./routes/user.routes.js");
//
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

// MIDDLEWARE 
const { checkUser, requireAuth } = require("./middleware/auth.middleware.js");
//

const server = express();
const port = process.env.SERVER_PORT;

// cors options //


const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}

//

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors(corsOptions));

// jwt

server.get("*", checkUser);
server.get("/jwtid", requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});





// routes
server.use("/api/user/", userRoutes);
//


server.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });

module.exports = server;