const { createContainer, asClass, asValue, asFunction } = require('awilix');

//Services
const { HomeService } = require("../services");

//Confi
const config = require("../config");
const app = require(".");

//Controllers
const { HomeController } = require("../controllers")

//Routes
const { HomeRoutes } = require("../routes/indexRoutes")
const Routes = require('../routes');

const container = createContainer();

container.register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
}).
register({
    HomeService: asClass(HomeService).singleton()
}).register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton()
}).register({
    HomeRoutes: asFunction(HomeRoutes).singleton()
});

module.exports = container;