import { NextFunction, Response, Request } from "express";
import { PlayerStatusLogic } from "../logic/player-status.logic";
import { IRoute } from "../models/interfaces/route.interface";
import { BaseController } from "./base.controller";

export class PlayerStatusController extends BaseController {
	routes: IRoute[] = [
		{
			path: "/",
			method: "GET",
			func: this.getAllPlayers.bind(this),
		},
		{
			path: "/names",
			method: "GET",
			func: this.getAllPlayersNames.bind(this),
		},
		{
			path: "/:username",
			method: "GET",
			func: this.getByUsername.bind(this),
		},
		{
			path: "/id/:playerId",
			method: "GET",
			func: this.getByPlayerId.bind(this),
		},
	];

	constructor(private playerStatusLogic: PlayerStatusLogic = new PlayerStatusLogic()) {
		super({ path: "/player/status" });
		this.loadRoutes();
	}
	async getAllPlayersNames(req: Request, res: Response, next: NextFunction) {
		let result = await this.playerStatusLogic.getPlayerNames();
		res.json(result);
	}
	async getByUsername(req: Request, res: Response, next: NextFunction) {
		let result = await this.playerStatusLogic.getStatusOfUsername({ username: req.params["username"] });
		res.json(result);
	}
	async getByPlayerId(req: Request, res: Response, next: NextFunction) {
		res.json(await this.playerStatusLogic.getStatusOfPlayerId({ playerId: req.params["playerId"] }));
	}
	async getAllPlayers(req: Request, res: Response, next: NextFunction) {
		let result = await this.playerStatusLogic.getStatusesOfAllPlayers();
		res.json(result);
	}
}
