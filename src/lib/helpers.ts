import type { PinnerCollectionData } from './sections/app/collections/schema';

export async function replacePinnedTabs(tabs: PinnerCollectionData['tabs']) {
	const pinnedTabs = await chrome.tabs.query({ pinned: true });
	for (const pinnedTab of pinnedTabs) {
		if (!pinnedTab.id) continue;

		await chrome.tabs.remove(pinnedTab.id);
	}

	for (const data of tabs) {
		const tab = await chrome.tabs.create({
			pinned: true,
			url: data.url
		});

		await chrome.tabs.update(tab.id, {
			muted: data.isMuted
		});
	}
}
