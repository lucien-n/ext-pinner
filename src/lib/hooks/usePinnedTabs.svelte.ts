import { browser } from '$app/env';
import { onMount } from 'svelte';

type PinnedTab = Omit<chrome.tabs.Tab, 'pinned' | 'url'> & { pinned: true; url: string };

let pinnedTabs = $state<PinnedTab[]>([]);

export function usePinnedTabs() {
	if (!browser) {
		return {
			current: pinnedTabs
		};
	}

	onMount(() => {
		updatePinnedTabs();
	});

	chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
		if (changeInfo.pinned === undefined) return;

		updatePinnedTabs();
	});

	chrome.tabs.onRemoved.addListener(() => {
		updatePinnedTabs();
	});

	async function updatePinnedTabs() {
		const tabs = await chrome.tabs.query({ pinned: true });

		// redundant but needed for type safety
		pinnedTabs = tabs.filter((tab): tab is PinnedTab => !!tab.pinned && !!tab.url);
	}

	return {
		get current() {
			return pinnedTabs;
		}
	};
}
