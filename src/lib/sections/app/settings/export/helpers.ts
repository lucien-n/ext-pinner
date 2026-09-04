import * as v from 'valibot';
import { parsers } from './parsers';
import { parserSchemas, type ParserSchema } from './schemas';
import { ParserType, type UnversionedPinnerData } from './types';

function parseWithParser<Parser extends ParserType>(
	parserType: Parser,
	data: unknown
): UnversionedPinnerData | null {
	const result = v.safeParse(parserSchemas[parserType], data);
	if (!result.success) return null;

	return parsers[parserType].fromJSON(result.output as ParserSchema<Parser>);
}

export function parsePinnerDataFromJSON(data: unknown): UnversionedPinnerData | null {
	for (const type of Object.values(ParserType)) {
		const result = parseWithParser(type, data);
		if (result) return result;
	}

	return null;
}

export function parsePinnerDataToJSON<Parser extends ParserType>(
	parserType: Parser,
	data: UnversionedPinnerData
): ParserSchema<Parser> {
	return parsers[parserType].toJSON(data);
}
