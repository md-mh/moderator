const express = require("express");
const routesModerator = express.Router();
const { ModeratorsAll } = require("./ModeratorAll");
const { ModeratorAdd } = require("./ModeratorAdd");
const { ModeratorDelete } = require("./ModeratorDelete");

routesModerator.get("/all", ModeratorsAll);
routesModerator.post("/add", ModeratorAdd);
routesModerator.delete("/:id", ModeratorDelete);

module.exports = routesModerator;
