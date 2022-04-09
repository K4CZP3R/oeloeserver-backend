import { Schema, model } from "mongoose";

export interface IPlayerStatus {
	_id?: string;
	playerId: string;
	playerName: string;
	timeOfEvent: number;
	type: "JOINED" | "LEFT";
}

const schema = new Schema<IPlayerStatus>({
	_id: { type: String },
	playerId: { type: String },
	playerName: { type: String },
	timeOfEvent: { type: Number },
	type: { type: String },
});

export const PlayerStatusModel = model<IPlayerStatus>("PlayerStatus", schema, "PlayerStatus");
