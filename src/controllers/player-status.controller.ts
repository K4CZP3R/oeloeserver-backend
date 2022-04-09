import { NextFunction, Response, Request } from "express";
import { PlayerStatusLogic } from "../logic/player-status.logic";
import { IRoute } from "../models/interfaces/route.interface";
import { BaseController } from "./base.controller";

export class PlayerStatusController extends BaseController {
	routes: IRoute[] = [
		{
			path: "/user/:username",
			method: "GET",
			func: this.getByUsername.bind(this),
		},
		{
			path: "/",
			method: "GET",
			func: this.getAllPlayers.bind(this),
		},
	];

	constructor(private playerStatusLogic: PlayerStatusLogic = new PlayerStatusLogic()) {
		super({ path: "/player/status" });
		this.loadRoutes();
	}
	async getByUsername(req: Request, res: Response, next: NextFunction) {
		let result = await this.playerStatusLogic.getStatusOfUsername({ username: req.params["username"] });
		res.json(result);
	}
	async getAllPlayers(req: Request, res: Response, next: NextFunction) {
		let result = await this.playerStatusLogic.getStatusesOfAllPlayers();
		res.json(result);
	}
}
