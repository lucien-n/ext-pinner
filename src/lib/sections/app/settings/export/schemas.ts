import * as v from 'valibot';
import { ParserType } from './types';

export const parserSchemas = {
	[ParserType.Pinner]: v.object({
		autoloaded_id: v.nullable(v.string()),
		collections: v.array(
			v.object({
				id: v.string(),
				name: v.string(),
				tabs: v.array(
					v.object({
						url: v.pipe(v.string(), v.url()),
						is_muted: v.optional(v.boolean(), false)
					})
				)
			})
		)
	}),
	[ParserType.SavePinnedTabs]: v.record(
		v.string(),
		v.object({
			autoload: v.pipe(v.number(), v.values([0, 1])),
			set_name: v.string(),
			tabs: v.array(v.pipe(v.string(), v.url()))
		})
	)
} as const satisfies Record<ParserType, v.GenericSchema>;

export type ParserSchema<Parser extends ParserType> = v.InferOutput<(typeof parserSchemas)[Parser]>;
