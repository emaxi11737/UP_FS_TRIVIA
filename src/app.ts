import "reflect-metadata";
import "module-alias/register";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connect } from "mongoose";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import * as swagger from "swagger-express-ts";
import { TYPES } from "@constants/types";

// import all services
import UserService from '@configuration/usecases/UserService';
import QuestionService from '@configuration/usecases/QuestionService';
import QuestionCategoryService from '@configuration/usecases/QuestionCategoryService';
import AuthService from '@configuration/usecases/AuthService';

// Import all repositories interfaces
import IUserRepository from '@application/repositories/IUserRepository';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';

// Import all repositories
import UserMongoDBRepository from '@infraestructure/repositories/user/UserMongoDBRepository';
import QuestionMongoDBRepository from '@infraestructure/repositories/question/QuestionMongoDBRepository';
import QuestionCategoryMongoDBRepository from '@infraestructure/repositories/questioncategory/QuestionCategoryMongoDBRepository';

// Import all controllers
import "@entrypoint/controllers/UserController";
import "@entrypoint/controllers/QuestionController";
import "@entrypoint/controllers/QuestionCategoryController";
import "@entrypoint/controllers/AuthController";

class App {
	private container: Container;
	private app: express.Application;

	private static readonly PORT: number = 3000;

	constructor() {
		this.container = new Container();

		this.bindClassesInjection();
		this.initServer();
		this.helloWorld();
		this.listenServer();
		this.setMongoConfig();
	}

	private bindClassesInjection(): void {
		this.container.bind<UserService>(TYPES.UserService).to(UserService);
		this.container.bind<QuestionCategoryService>(TYPES.QuestionCategoryService).to(QuestionCategoryService);
		this.container.bind<QuestionService>(TYPES.QuestionService).to(QuestionService);
		this.container.bind<IUserRepository>(TYPES.IUserRepository).to(UserMongoDBRepository);
		this.container.bind<IQuestionCategoryRepository>(TYPES.IQuestionCategoryRepository).to(QuestionCategoryMongoDBRepository);
		this.container.bind<IQuestionRepository>(TYPES.IQuestionRepository).to(QuestionMongoDBRepository);
		this.container.bind<AuthService>(TYPES.AuthService).to(AuthService);
	}

	private initServer(): void {
		const server = new InversifyExpressServer(this.container);
		server.setConfig((application: express.Application) => {
			application.use('/api-docs/swagger', express.static('swagger'));
			application.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
			application.use(bodyParser.json({ limit: '200mb' }));
			application.use(cors());
			application.use(swagger.express({
				definition: {
					info: {
						title: "TRIVIA-BACKEND",
						version: "1.0.0"
					},
				}
			}));
		});

		this.app = server.build();
	}

	private helloWorld(): void {
		this.app.get('/', (req, res) => {
			res.send('Hello World');
		})
	}

	private listenServer(): void {
		this.app.listen(App.PORT, () => console.log(`Server started on *:${App.PORT}`));
	}

	private async setMongoConfig() {
		await connect("mongodb://trivia-db:27017/trivia_db");
	}
}

export default new App();
