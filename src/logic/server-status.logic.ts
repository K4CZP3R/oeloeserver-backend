import { MC_SERVER_STATUS_SERVICE } from "../helpers/di-names.helper";
import { checkValues } from "../helpers/type-checker.helper";
import { IResult } from "../models/interfaces/result.interface";
import { Inject } from "../services/dependency-provider.service";
import { McServerStatusService } from "../services/mc-server-status.service";

export class ServerStatusLogic {
	@Inject<McServerStatusService>(MC_SERVER_STATUS_SERVICE)
	mcServerStatusService!: McServerStatusService;

	constructor() {}

	async queryServerStatus(data: { host: string; port: number }): Promise<IResult<any>> {
		checkValues(data, { shouldContainKeys: ["host", "port"] });

		let queriedData = await this.mcServerStatusService.queryAllData(data.host, data.port);

		return { success: true, data: queriedData };
	}
	async serverStatus(data: { host: string; port: number }): Promise<IResult<any>> {
		checkValues(data, { shouldContainKeys: ["host", "port"] });
		let statusData = await this.mcServerStatusService.status(data.host, data.port);
		return { success: true, data: statusData };
	}
}
