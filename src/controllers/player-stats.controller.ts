import { NextFunction, Response, Request } from "express";
import { PlayerStatsLogic } from "../logic/player-stats.logic";
import { IRoute } from "../models/interfaces/route.interface";
import { BaseController } from "./base.controller";

export class PlayerStatsController extends BaseController {
	routes: IRoute[] = [
		{
			path: "/:playerId",
			method: "GET",
			func: this.getByPlayerId.bind(this),
		},
	];

	constructor(private playerStatLogic = new PlayerStatsLogic()) {
		super({ path: "/player/stats" });
		this.loadRoutes();
	}

	async getByPlayerId(req: Request, res: Response, next: NextFunction) {
		let resp = await this.playerStatLogic.getStatsByPlayerId({ playerId: req.params["playerId"] });
		res.json(resp);
	}
}
