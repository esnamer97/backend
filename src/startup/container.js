const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Services
const {
  HomeService,
  CommentService,
  UserService,
  IdeaService
} = require("../services");

//Confi
const config = require("../config");
const app = require(".");

//Controllers
const {
  HomeController,
  CommentController,
  IdeaController,
  UserController
} = require("../controllers");

//Routes
const { HomeRoutes } = require("../routes/indexRoutes");
const Routes = require("../routes");

//Models
const { User, Idea, Comment } = require("../models");

// repositories
const {
  UserRepository,
  IdeaRepository,
  CommentRepository
} = require("../repositories");

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    CommentService: asClass(CommentService).singleton()
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    CommentController: asClass(
      CommentController.bind(CommentController)
    ).singleton()
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton()
  })
  .register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton()
  });

module.exports = container;
