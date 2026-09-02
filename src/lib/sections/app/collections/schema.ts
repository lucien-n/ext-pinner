import * as v from 'valibot';

export const urlSchema = v.pipe(
	v.string(),
	v.url(),
	v.transform((url) => url.trim().toLowerCase())
);

// todo: tab id to allow duplicate tab urls
export const tabSchema = v.object({
	url: urlSchema,
	isMuted: v.boolean()
});

export type TabData = v.InferInput<typeof tabSchema>;

export const pinnerCollectionDataSchema = v.object({
	id: v.string(),
	name: v.pipe(v.string(), v.minLength(2), v.maxLength(32)),
	tabs: v.array(tabSchema)
});

export type PinnerCollectionData = v.InferInput<typeof pinnerCollectionDataSchema>;

export const createPinnerCollectionSchema = v.object({
	name: pinnerCollectionDataSchema.entries.name,
	tabs: v.pipe(pinnerCollectionDataSchema.entries.tabs)
});

export type CreatePinnerCollection = v.InferInput<typeof createPinnerCollectionSchema>;
