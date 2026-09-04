import type { PinnerData } from '$lib/pinner-storage';
import * as v from 'valibot';
import { parsers } from './parsers';
import { parserSchemas, type ExportSchema } from './schemas';
import { PinnerParserType } from './types';

function parseWithParser<Parser extends PinnerParserType>(
	type: Parser,
	data: unknown
): PinnerData | null {
	const result = v.safeParse(parserSchemas[type], data);
	if (!result.success) return null;

	return parsers[type].fromJSON(result.output as ExportSchema<Parser>);
}

export function parsePinnerDataFromJSON(data: unknown): PinnerData | null {
	for (const type of Object.values(PinnerParserType)) {
		const result = parseWithParser(type, data);

		if (result) return result;
	}

	return null;
}
