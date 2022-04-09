import { Schema, model } from "mongoose";

export interface IPlayerStat {
	_id?: string;
	playerId: string;
	statNames: string[];
	statValues: string[];
}

const schema = new Schema<IPlayerStat>({
	_id: { type: String },
	playerId: { type: String },
	statNames: [{ type: String }],
	statValues: [{ type: String }],
});

export const PlayerStatModel = model<IPlayerStat>("PlayerStat", schema, "PlayerStat");
