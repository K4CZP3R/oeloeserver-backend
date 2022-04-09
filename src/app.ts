import express from "express";
import helmet from "helmet";
import cors from "cors";

import { IController } from "./models/interfaces/controller.interface";
import { errorMiddleware } from "./middlewares/error.middleware";
import { DependencyProviderService } from "./services/dependency-provider.service";
import { JWT_SERVICE } from "./helpers/di-names.helper";
import { getEnvironment } from "./helpers/dotenv.helper";
import { createMongooseConnection } from "./services/mongoose-connection.service";
import { configToMongoUrl } from "./helpers/mongo.helper";
import { JwtSessionService } from "./services/jwt-session.service";
import { Environment } from "./models/environment.model";
import { AuthController } from "./controllers/auth.controller";
import { PlayerStatusController } from "./controllers/player-status.controller";

export class App {
	public app: express.Express;

	private controllers: IController[] = [new AuthController(), new PlayerStatusController()];

	constructor() {
		this.app = express();

		this.bootstrapApp()
			.then(() => {
				console.log("App bootstrapped!");
			})
			.catch((e: any) => {
				console.error("Something went wrong while bootstrapping", e);
			});
	}

	private async bootstrapApp() {
		const env = getEnvironment();
		this.setupDi(env);
		if (env.isDev()) await this.seedDatabaseInDev();
		this.setupMiddlewares();
		this.setupControllers();
		this.setupAfterMiddlewares();
	}

	private setupDi(env: Environment) {
		let keypair = env.getJwtKeyPair();
		DependencyProviderService.setImpl<JwtSessionService>(
			JWT_SERVICE,
			new JwtSessionService({
				privateKey: keypair.private,
				publicKey: keypair.public,
				expiresIn: 60 * 60 * 24,
				issuer: "KSP",
			})
		);

		createMongooseConnection(configToMongoUrl(env.getDatabase()));
	}

	private setupMiddlewares() {
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
	}

	private setupControllers() {
		this.controllers.forEach(controller => {
			this.app.use(controller.path, controller.router);
		});
	}

	private setupAfterMiddlewares() {
		this.app.use(errorMiddleware);
	}

	private async seedDatabaseInDev() {
		/* Define repos and seed here */
	}
}