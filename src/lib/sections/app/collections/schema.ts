import { pinnerSchema } from '$lib/pinner-storage';
import * as v from 'valibot';

// todo: tab id to allow duplicate tab urls

export const pinnerCollectionDataSchema = pinnerSchema.entries.collections.item;

export type PinnerCollectionData = v.InferInput<typeof pinnerCollectionDataSchema>;

export const createPinnerCollectionSchema = v.object({
	name: pinnerCollectionDataSchema.entries.name,
	tabs: pinnerCollectionDataSchema.entries.tabs
});

export type CreatePinnerCollection = v.InferInput<typeof createPinnerCollectionSchema>;

export const urlSchema = pinnerCollectionDataSchema.entries.tabs.item.entries.url;
