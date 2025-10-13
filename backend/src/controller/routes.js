const express = require("express");
const routes = express.Router();
const routesModerator = require("./moderator/routeModerator");

routes.use("/moderators", routesModerator);

module.exports = routes;
