const { Router } = require("express");
const routes = Router();
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

routes.post("/devs", DevController.savedev);

routes.get("/devs", DevController.getdevs);

routes.get("/search", SearchController.index);

module.exports = routes;
