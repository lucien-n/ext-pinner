import { replacePinnedTabs } from '$lib/helpers.js';
import { usePinner, type UsePinnerReturn } from '$lib/hooks/usePinner.svelte.js';
import { getContext, setContext } from 'svelte';
import type { PinnerCollectionData, TabData } from '../schema.js';

class PinnerCollectionCtx {
	data = $state<PinnerCollectionData>()!;
	#pinner: UsePinnerReturn;

	constructor(data: PinnerCollectionData, pinner: UsePinnerReturn) {
		this.data = data;
		this.#pinner = pinner;
	}

	get isAutoload() {
		return this.#pinner.autoloadId === this.data.id;
	}

	delete() {
		return this.#pinner.delete(this.data.id);
	}

	setAutoload(checked: boolean) {
		return this.#pinner.setAutoloadId(checked && !this.isAutoload ? this.data.id : null);
	}

	load() {
		return replacePinnedTabs(this.data.tabs);
	}

	add(tab: TabData) {
		// todo: adding a tab with the exact same url as an existing one will cause issues
		// fix by introducing tab ids
		this.data.tabs.push(tab);

		this.save();
	}

	// todo: what do we do when we remove the last url of a collection ? (delete ?)
	remove(url: string) {
		this.data.tabs = this.data.tabs.filter((tab) => tab.url !== url);

		this.save();
	}

	reorder(newTabs: TabData[]) {
		this.data.tabs = newTabs;

		this.save();
	}

	toggleIsMuted(url: string) {
		const tab = this.data.tabs.find((tab) => tab.url === url);
		if (!tab) return;

		tab.isMuted = !tab.isMuted;

		this.save();
	}

	private save() {
		this.#pinner.save(this.data);
	}
}

const KEY = Symbol('collection');

export function getPinnerCollectionCtx(): PinnerCollectionCtx {
	return getContext<PinnerCollectionCtx>(KEY);
}

export function setPinnerCollectionCtx(collection: PinnerCollectionData): PinnerCollectionCtx {
	const ctx = new PinnerCollectionCtx(collection, usePinner());

	setContext<PinnerCollectionCtx>(KEY, ctx);

	return ctx;
}
