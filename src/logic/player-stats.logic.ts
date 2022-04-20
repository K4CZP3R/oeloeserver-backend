import { checkValues } from "../helpers/type-checker.helper";
import { IResult } from "../models/interfaces/result.interface";
import { IPlayerStat } from "../models/player-stat.model";
import { PlayerStatRepository } from "../repositories/player-stat.repository";

export class PlayerStatsLogic {
	constructor(private playerStatRepository = new PlayerStatRepository()) {}

	async getStatsByPlayerId(data: { playerId: string }): Promise<IResult<{ playerId: string; stats: any }>> {
		checkValues(data, { shouldContainKeys: ["playerId"] });

		let stats = await this.playerStatRepository.getByPlayerId(data.playerId);
		if (stats === null) throw new Error(`No stats found for ${data.playerId}`);
		return { success: true, data: { playerId: data.playerId, stats: this.makeStatsReadable(stats) } };
	}

	private makeStatsReadable(playerStats: IPlayerStat) {
		let toReturn = {};

		for (let key of playerStats.statNames) {
			let splitted = key.split("@");

			let achType = splitted[0];
			let achProp = splitted[1];

			if (!toReturn[achType]) {
				if (achProp !== undefined) toReturn[achType] = {};
				else {
					toReturn[achType] = playerStats.statValues[playerStats.statNames.indexOf(key)];
					continue;
				}
			}
			toReturn[achType][achProp] = playerStats.statValues[playerStats.statNames.indexOf(key)];
		}
		return toReturn;
	}
}
