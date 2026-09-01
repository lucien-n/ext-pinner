import * as v from 'valibot';

export const urlSchema = v.pipe(
	v.string(),
	v.url(),
	v.transform((url) => url.trim().toLowerCase())
);

export const pinnerCollectionDataSchema = v.object({
	id: v.string(),
	name: v.pipe(v.string(), v.minLength(2), v.maxLength(32)),
	urls: v.array(urlSchema)
});

export type PinnerCollectionData = v.InferInput<typeof pinnerCollectionDataSchema>;

export const createPinnerCollectionSchema = v.object({
	name: pinnerCollectionDataSchema.entries.name,
	urls: v.pipe(
		pinnerCollectionDataSchema.entries.urls,
		v.transform((urls) => [...new Set(urls)])
	)
});

export type CreatePinnerCollection = v.InferInput<typeof createPinnerCollectionSchema>;
