import { IEnvironment } from "./interfaces/environment.interface";
import { IDatabaseConfig } from "./interfaces/orm-database-config.interface";
import { readFileSync } from "fs";

export class Environment {
	constructor(public env: IEnvironment) {}

	getDatabase(): IDatabaseConfig {
		return {
			url: this.env.DB_URL,
		};
	}

	isDev(): boolean {
		return this.env.ENVIRONMENT === "dev";
	}

	getJwtKeyPair(): { private: string; public: string } {
		return {
			private: readFileSync(this.env.JWT_KEY_PRIVATE).toString(),
			public: readFileSync(this.env.JWT_KEY_PUBLIC).toString(),
		};
	}
}
