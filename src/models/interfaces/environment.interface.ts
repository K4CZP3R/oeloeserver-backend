/**
 * Valid environmental vars from .env
 */
export interface IEnvironment {
	ENVIRONMENT: string;
	SERVER_PORT: number;

	DB_URL: string;

	JWT_KEY_PRIVATE: string;
	JWT_KEY_PUBLIC: string;
}

/**
 * Needed to be able to strip environment from unused properties
 * (this is something like allow-list)
 *
 * There is no other way to get keys of an interface in TypeScript
 * @link https://stackoverflow.com/a/54308812
 */
type KeysEnum<T> = { [P in keyof Required<T>]: true };
export const IEnvironmentKeys: KeysEnum<IEnvironment> = {
	ENVIRONMENT: true,
	SERVER_PORT: true,
	DB_URL: true,

	JWT_KEY_PRIVATE: true,
	JWT_KEY_PUBLIC: true,
};
