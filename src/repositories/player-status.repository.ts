import { PlayerStatusModel, IPlayerStatus } from "../models/player-status.model";

export class PlayerStatusRepository {
	constructor(private Model = PlayerStatusModel) {}

	async getByPlayerName(playerName: string, nOfEntries: number = 2): Promise<IPlayerStatus[]> {
		return (await this.Model.find({ playerName: playerName })
			.sort({ timeOfEvent: -1 })
			.limit(nOfEntries)) as IPlayerStatus[];
	}

	async getAllPlayers(): Promise<string[]> {
		return (await this.Model.find().distinct("playerName")) as string[];
	}
}
