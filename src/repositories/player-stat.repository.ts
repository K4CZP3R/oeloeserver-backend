import { PlayerStatModel, IPlayerStat } from "../models/player-stat.model";

export class PlayerStatRepository {
	constructor(private Model = PlayerStatModel) {}

	async getByPlayerId(playerId: string): Promise<IPlayerStat> {
		return (await this.Model.findOne({ playerId: playerId })) as IPlayerStat;
	}
}
