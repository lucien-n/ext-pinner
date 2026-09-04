import { m } from '$lib/paraglide/messages';
import {
	INIT_PINNER_DATA,
	loadPinnerData,
	savePinnerData,
	type PinnerData
} from '$lib/pinner-storage.js';
import {
	createPinnerCollectionSchema,
	type CreatePinnerCollection,
	type PinnerCollectionData
} from '$lib/sections/app/collections/schema.js';
import { nanoid } from 'nanoid';
import { onMount } from 'svelte';
import * as v from 'valibot';

export interface UsePinnerReturn {
	save: (input: CreatePinnerCollection) => Promise<string | undefined>;
	delete: (id: string) => Promise<void>;
	import: (collection: PinnerCollectionData) => void;
	setAutoloadId: (newAutoloadId: string | null) => Promise<void>;
	getByName: (name: string) => PinnerCollectionData | undefined;
	autoloadId: PinnerData['autoloadId'];
	collections: PinnerData['collections'];
}

let data = $state<PinnerData>(INIT_PINNER_DATA);

let initialized = false;

export async function initializePinner() {
	if (initialized) return;

	initialized = true;

	const loaded = await loadPinnerData();
	if (!loaded) return;

	data = loaded;

	if (data.autoloadId && !isAutoloadIdValid(data.autoloadId)) {
		data.autoloadId = null;
		await saveData();
	}
}

async function saveData() {
	await savePinnerData($state.snapshot(data));
}

function isAutoloadIdValid(id: string) {
	return data.collections.some((c) => c.id === id);
}

function getCollectionByName(name: string) {
	return data.collections.find((c) => c.name.toLowerCase() === name.trim().toLowerCase());
}

export function usePinner(): UsePinnerReturn {
	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		const loaded = await loadPinnerData();
		if (!loaded) return;

		data = loaded;

		if (data.autoloadId && !isAutoloadIdValid(data.autoloadId)) {
			data.autoloadId = null;
			await saveData();
		}
	}

	async function saveData() {
		await savePinnerData($state.snapshot(data));
	}

	function isAutoloadIdValid(autoloadId: string) {
		return data.collections.some((c) => c.id === autoloadId);
	}

	return {
		async save(input) {
			const result = v.safeParse(createPinnerCollectionSchema, input);
			if (!result.success) {
				return m.major_legal_buzzard_zoom();
			}
			const parsedInput = result.output;

			const existingCollection = getCollectionByName(parsedInput.name);
			if (existingCollection) {
				const index = data.collections.findIndex((c) => c.id === existingCollection.id);

				data.collections[index] = {
					...existingCollection,
					tabs: parsedInput.tabs
				};
			} else {
				const newCollection: PinnerCollectionData = {
					id: nanoid(),
					name: parsedInput.name,
					tabs: parsedInput.tabs
				};

				data.collections.push(newCollection);
			}

			await saveData();
		},
		async delete(id) {
			data.collections = data.collections.filter((c) => c.id !== id);

			if (id === data.autoloadId) {
				data.autoloadId = null;
			}

			await saveData();
		},
		async import(collection) {
			const existingCollection = getCollectionByName(collection.name);
			if (existingCollection) {
				this.save(collection);
			} else {
				data.collections.push(collection);
			}

			await saveData();
		},
		async setAutoloadId(newAutoloadId) {
			if (newAutoloadId && !isAutoloadIdValid(newAutoloadId)) {
				data.autoloadId = null;
			} else {
				data.autoloadId = newAutoloadId;
			}

			await saveData();
		},
		getByName: getCollectionByName,
		get collections() {
			return data.collections;
		},
		set collections(newCollections: PinnerCollectionData[]) {
			data.collections = newCollections;
			saveData();
		},
		get autoloadId() {
			return data.autoloadId;
		}
	};
}
