import * as v from 'valibot';
import { pinnerCollectionDataSchema } from '../collections/schema';

export const pinerExportSchema = v.array(
	v.object({
		id: v.pipe(v.string(), v.nanoid()),
		collection_name:
	})
);
