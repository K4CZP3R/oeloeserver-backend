import { NextFunction, Response, Request } from "express";
import { ServerStatusLogic } from "../logic/server-status.logic";
import { IRoute } from "../models/interfaces/route.interface";
import { BaseController } from "./base.controller";

export class ServerStatusController extends BaseController {
	routes: IRoute[] = [
		{
			path: "/query/:host/:port",
			method: "GET",
			func: this.queryServer.bind(this),
		},
		{
			path: "/status/:host/:port",
			method: "GET",
			func: this.statusServer.bind(this),
		},
	];

	constructor(private serverStatusLogic = new ServerStatusLogic()) {
		super({ path: "/server" });
		this.loadRoutes();
	}

	async queryServer(req: Request, res: Response, next: NextFunction) {
		let resp = await this.serverStatusLogic.queryServerStatus({
			host: req.params["host"],
			port: parseInt(req.params["port"]),
		});
		res.json(resp);
	}
	async statusServer(req: Request, res: Response, next: NextFunction) {
		let resp = await this.serverStatusLogic.serverStatus({
			host: req.params["host"],
			port: parseInt(req.params["port"]),
		});
		res.json(resp);
	}
}
