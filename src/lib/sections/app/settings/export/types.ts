import type { PinnerData } from '$lib/pinner-storage';

export enum ParserType {
	Pinner = 'pinner',
	SavePinnedTabs = 'save_pinned_tabs'
}

export type UnversionedPinnerData = Omit<PinnerData, 'version'>;
