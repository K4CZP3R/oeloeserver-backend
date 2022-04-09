import { FullQueryResponse, JavaStatusResponse, queryFull, status } from "minecraft-server-util";

export class McServerStatusService {
	async queryAllData(host: string, port: number): Promise<FullQueryResponse> {
		return await queryFull(host, port);
	}
	async status(host: string, port: number): Promise<JavaStatusResponse> {
		return await status(host, port);
	}
}
