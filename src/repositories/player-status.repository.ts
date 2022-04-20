import { PlayerStatusModel, IPlayerStatus } from "../models/player-status.model";
import { uniqBy } from "lodash";

export class PlayerStatusRepository {
	constructor(private Model = PlayerStatusModel) {}

	async getByPlayerId(playerId: string, nOfEntries: number = 2): Promise<IPlayerStatus[]> {
		return (await this.Model.find({ playerId: playerId })
			.sort({ timeOfEvent: -1 })
			.limit(nOfEntries)) as IPlayerStatus[];
	}
	async getByPlayerName(playerName: string, nOfEntries: number = 2): Promise<IPlayerStatus[]> {
		return (await this.Model.find({ playerName: playerName })
			.sort({ timeOfEvent: -1 })
			.limit(nOfEntries)) as IPlayerStatus[];
	}

	async getPlayerNames(): Promise<{ playerId: string; playerName: string }[]> {
		return uniqBy(await this.Model.find({}).select({ playerId: 1, playerName: 1, _id: 0 }), e => e.playerId);
	}
	async getAllPlayers(): Promise<string[]> {
		return (await this.Model.find().distinct("playerName")) as string[];
	}
}
