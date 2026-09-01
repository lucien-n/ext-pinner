import { replacePinnedUrls } from '$lib/helpers.js';
import { usePinner, type UsePinnerReturn } from '$lib/hooks/usePinner.svelte.js';
import { getContext, setContext } from 'svelte';
import type { PinnerCollectionData } from '../schema.js';

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
		return replacePinnedUrls(this.data.urls);
	}

	add(url: string) {
		this.data.urls = [...new Set([...this.data.urls, url])];

		this.save();
	}

	// todo: what do we do when we remove the last url of a collection ? (delete ?)
	remove(url: string) {
		this.data.urls = this.data.urls.filter((u) => u !== url);

		this.save();
	}

	reorder(newUrls: string[]) {
		this.data.urls = newUrls;

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
