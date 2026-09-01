import { pinnerCollectionDataSchema } from '$lib/sections/app/collections/schema.js';
import * as v from 'valibot';

export const pinnerDataSchema = v.object({
	collections: v.array(pinnerCollectionDataSchema),
	autoloadId: v.nullable(v.string())
});
export type PinnerData = v.InferInput<typeof pinnerDataSchema>;

const KEY = 'data';

export async function loadPinnerData(): Promise<PinnerData | undefined> {
	const stored = await chrome.storage.local.get(KEY);
	if (!stored[KEY]) return undefined;

	const result = v.safeParse(pinnerDataSchema, stored[KEY]);
	if (!result.success) {
		console.error('pinner data failed to parse', result.issues);
		return undefined;
	}

	return result.output;
}

export async function savePinnerData(data: PinnerData) {
	await chrome.storage.local.set({ [KEY]: data });
}
