import { NextFunction, Response, Request } from "express";
import { PlayerStatLogic } from "../logic/player-stat.logic";
import { PlayerStatusLogic } from "../logic/player-status.logic";
import { IRoute } from "../models/interfaces/route.interface";
import { BaseController } from "./base.controller";

export class PlayerStatController extends BaseController {
	routes: IRoute[] = [
		{
			path: "/:playerId",
			method: "GET",
			func: this.getByPlayerId.bind(this),
		},
	];

	constructor(private playerStatLogic = new PlayerStatLogic()) {
		super({ path: "/player/stat" });
		this.loadRoutes();
	}

	async getByPlayerId(req: Request, res: Response, next: NextFunction) {
		let resp = await this.playerStatLogic.getStatsByPlayerId({ playerId: req.params["playerId"] });
		res.json(resp);
	}
}
