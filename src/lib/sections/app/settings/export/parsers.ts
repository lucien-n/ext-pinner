import { LATEST_PINNER_SCHEMA_VERSION, type PinnerData } from '$lib/pinner-storage';
import type { ExportSchema } from './schemas';
import { PinnerParserType } from './types';

export const parsers: {
	[Parser in PinnerParserType]: {
		fromJSON: (data: ExportSchema<Parser>) => PinnerData;
		toJSON: (data: PinnerData) => ExportSchema<Parser>;
	};
} = {
	[PinnerParserType.Pinner]: {
		fromJSON: (data) => {
			return {
				autoloadId: data.autoloaded_id,
				collections: data.collections.map((c) => ({
					id: c.id,
					name: c.name,
					tabs: c.tabs.map((t) => ({
						url: t.url,
						isMuted: t.is_muted
					}))
				})),
				version: LATEST_PINNER_SCHEMA_VERSION
			};
		},
		toJSON(data) {
			return {
				autoloaded_id: data.autoloadId,
				collections: data.collections.map((c) => ({
					id: c.id,
					name: c.name,
					tabs: c.tabs.map((t) => ({
						url: t.url,
						is_muted: t.isMuted
					}))
				}))
			};
		}
	},
	[PinnerParserType.SavePinnedTabs]: {
		fromJSON: (data) => {
			let autoloadId = null;
			for (const [id, collection] of Object.entries(data)) {
				if (!collection.autoload) continue;

				autoloadId = id;
				break;
			}

			return {
				autoloadId,
				collections: Object.entries(data).map(([id, c]) => ({
					id,
					name: c.set_name,
					tabs: c.tabs.map((url) => ({
						url,
						isMuted: false
					}))
				})),
				version: LATEST_PINNER_SCHEMA_VERSION
			};
		},
		toJSON: (data) => {
			return Object.fromEntries(
				data.collections.map((c) => [
					c.id,
					{
						autoload: data.autoloadId === c.id ? 1 : 0,
						set_name: c.name,
						tabs: c.tabs.map((tab) => tab.url)
					}
				])
			);
		}
	}
};
