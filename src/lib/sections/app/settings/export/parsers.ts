import { type PinnerData } from '$lib/pinner-storage';
import type { ExportSchema } from './schemas';
import { ParserType } from './types';

export const parsers: {
	[Parser in ParserType]: {
		fromJSON: (data: ExportSchema<Parser>) => PinnerData['collections'];
		toJSON: (data: PinnerData) => ExportSchema<Parser>;
	};
} = {
	[ParserType.Pinner]: {
		fromJSON: (data) => {
			return data.collections.map((c) => ({
				id: c.id,
				name: c.name,
				tabs: c.tabs.map((t) => ({
					url: t.url,
					isMuted: t.is_muted
				}))
			}));
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
	[ParserType.SavePinnedTabs]: {
		fromJSON: (data) => {
			return Object.entries(data).map(([id, c]) => ({
				id,
				name: c.set_name,
				tabs: c.tabs.map((url) => ({
					url,
					isMuted: false
				}))
			}));
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
