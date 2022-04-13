import { ChangeStream } from "typeorm";
import { PlayerStatusModel } from "../models/player-status.model";

export class MongoWatcherService {
	public playerStatusStream: any = undefined;
	constructor() {
		this.playerStatusStream = PlayerStatusModel.watch();
	}

	getListeners() {
		return this.playerStatusStream.listenerCount();
	}
	addListener(listener) {
		return this.playerStatusStream.addListener("change", listener);
	}
	removeListener(listener) {
		return this.playerStatusStream.removeListener("change", listener);
	}
}
