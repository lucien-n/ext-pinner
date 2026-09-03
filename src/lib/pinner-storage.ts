import * as v from 'valibot';

const MIN_SCHEMA_VERSION = 0 as const;
// todo: bump when adding a new schema version
const LATEST_SCHEMA_VERSION = 1 as const;

const versionField = v.pipe(
	v.number(),
	v.integer(),
	v.minValue(MIN_SCHEMA_VERSION),
	v.maxValue(LATEST_SCHEMA_VERSION)
);

const schemas = {
	0: v.object({
		collections: v.array(
			v.object({
				id: v.string(),
				name: v.pipe(v.string(), v.minLength(2), v.maxLength(32)),
				urls: v.array(
					v.pipe(
						v.string(),
						v.url(),
						v.transform((url) => url.trim().toLowerCase())
					)
				)
			})
		),
		autoloadId: v.nullable(v.string()),
		version: v.literal(0)
	}),

	1: v.object({
		collections: v.array(
			v.object({
				id: v.string(),
				name: v.pipe(v.string(), v.minLength(2), v.maxLength(32)),
				tabs: v.array(
					v.object({
						url: v.pipe(
							v.string(),
							v.url(),
							v.transform((url) => url.trim().toLowerCase())
						),
						isMuted: v.boolean()
					})
				)
			})
		),
		autoloadId: v.nullable(v.string()),
		version: v.literal(1)
	})
} as const satisfies Record<number, v.GenericSchema>;

type SchemaVersions = keyof typeof schemas;

type SchemaOutputMap = {
	[Version in SchemaVersions]: v.InferOutput<(typeof schemas)[Version]>;
};

export type PinnerData = SchemaOutputMap[typeof LATEST_SCHEMA_VERSION];

export const pinnerSchema = schemas[LATEST_SCHEMA_VERSION];

const nextVersionMap = {
	0: 1
} as const satisfies Record<Exclude<SchemaVersions, typeof LATEST_SCHEMA_VERSION>, SchemaVersions>;
type NextVersionMap = typeof nextVersionMap;

type Migration<From extends keyof NextVersionMap> = {
	up: (data: SchemaOutputMap[From]) => SchemaOutputMap[NextVersionMap[From]];
};

export const schemasMigrations: {
	[Version in keyof NextVersionMap]: Migration<Version>;
} = {
	0: {
		up: (data) => ({
			...data,
			collections: data.collections.map((collection) => ({
				id: collection.id,
				name: collection.name,
				tabs: collection.urls.map((url) => ({
					url,
					isMuted: false
				}))
			})),
			version: 1
		})
	}
};

export const INIT_PINNER_DATA: PinnerData = {
	autoloadId: null,
	collections: [],
	version: 1
};

const KEY = 'data';
const BACKUP_KEY = 'data:backup';

const storedVersionSchema = v.object({
	version: versionField
});

function getStoredSchemaVersion(stored: unknown): SchemaVersions {
	if (!stored || typeof stored !== 'object') return MIN_SCHEMA_VERSION;

	const result = v.safeParse(storedVersionSchema, stored);
	if (!result.success) {
		return MIN_SCHEMA_VERSION;
	}

	return result.output.version as SchemaVersions;
}

async function backupAndResetData(data: unknown): Promise<void> {
	await savePinnerData(INIT_PINNER_DATA);

	await chrome.storage.local.set({ [BACKUP_KEY]: data });
}

export async function loadPinnerData(): Promise<PinnerData | undefined> {
	const stored = await chrome.storage.local.get(KEY);
	const storedData = stored[KEY];
	if (!storedData) return undefined;

	let data: unknown = storedData;

	let version = getStoredSchemaVersion(storedData);

	while (version in nextVersionMap) {
		const migratableVersion = version as keyof typeof nextVersionMap;

		const schema = schemas[migratableVersion];
		const parsed = v.safeParse(schema, data);

		if (!parsed.success) {
			console.error(`failed to validate pinner data at schema version ${migratableVersion}`);

			await backupAndResetData(data);

			return undefined;
		}

		data = schemasMigrations[migratableVersion].up(parsed.output);
		version = nextVersionMap[migratableVersion];
	}

	const result = v.safeParse(schemas[LATEST_SCHEMA_VERSION], data);

	if (!result.success) {
		console.error('failed to validate migrated pinner data');

		await backupAndResetData(data);

		return undefined;
	}

	return result.output;
}

export async function savePinnerData(data: PinnerData) {
	await chrome.storage.local.set({ [KEY]: data });
}
