import { checkValues } from "../helpers/type-checker.helper";
import { ICurrentPlayerStatus } from "../models/interfaces/current-player-status.interface";
import { IResult } from "../models/interfaces/result.interface";
import { IPlayerStatus } from "../models/player-status.model";
import { PlayerStatusRepository } from "../repositories/player-status.repository";

export class PlayerStatusLogic {
	constructor(private playerStatusRepository = new PlayerStatusRepository()) {}

	private getCurrentStatus(statuses: IPlayerStatus[]): ICurrentPlayerStatus {
		if (statuses.length === 0) throw new Error("Can't get current status with no data!");
		let toReturn: ICurrentPlayerStatus = {
			playerId: statuses[0].playerId,
			playerName: statuses[0].playerName,
			currentState: {
				isOnline: statuses[0].type === "JOINED",
				since: statuses[0].timeOfEvent,
			},
		};

		if (statuses.length < 2) {
			return toReturn;
		}

		toReturn["lastState"] = {
			isOnline: statuses[1].type === "JOINED",
			for: statuses[0].timeOfEvent - statuses[1].timeOfEvent,
		};
		return toReturn;
	}

	async getStatusesOfAllPlayers(): Promise<IResult<any>> {
		let playersName = await this.playerStatusRepository.getAllPlayers();
		let toReturn = [];

		for (let playerName of playersName) {
			let playerStatuses = await this.playerStatusRepository.getByPlayerName(playerName);
			toReturn.push(this.getCurrentStatus(playerStatuses));
		}
		return { success: true, data: toReturn };
	}

	async getStatusOfPlayerId(data: { playerId: string }): Promise<IResult<ICurrentPlayerStatus>> {
		checkValues(data, { shouldContainKeys: ["playerId"] });

		let statuses = await this.playerStatusRepository.getByPlayerId(data.playerId);
		if (statuses.length === 0) {
			throw new Error("User not found!");
		}

		return { success: true, data: this.getCurrentStatus(statuses) };
	}
	async getStatusOfUsername(data: { username: string }): Promise<IResult<ICurrentPlayerStatus>> {
		checkValues(data, { shouldContainKeys: ["username"] });

		let statuses = await this.playerStatusRepository.getByPlayerName(data.username);
		if (statuses.length === 0) {
			throw new Error("User not found!");
		}

		return { success: true, data: this.getCurrentStatus(statuses) };
	}

	async getPlayerNames(): Promise<IResult<{ playerName: string; playerId: string }[]>> {
		let names = await this.playerStatusRepository.getPlayerNames();
		return { success: true, data: names };
	}
}
