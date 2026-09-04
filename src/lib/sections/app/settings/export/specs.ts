import { ParserType } from './types';

export const PARSER_TYPE_SPECS: {
	[Parser in ParserType]: { value: Parser; label: string; extensionUrl: string };
} = {
	[ParserType.Pinner]: {
		value: ParserType.Pinner,
		label: 'Pinner',
		extensionUrl:
			'https://chromewebstore.google.com/detail/pinner-persisted-pinned-t/aabmkfbjcdbcjdjkdjjdpminiffikhpc'
	},
	[ParserType.SavePinnedTabs]: {
		value: ParserType.SavePinnedTabs,
		label: 'Save Pinned Tabs',
		extensionUrl:
			'https://chromewebstore.google.com/detail/save-pinned-tabs/anmidgajdonkgmmilbccfefkfieajakd'
	}
};
