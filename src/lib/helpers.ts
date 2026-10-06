import type { PinnerCollectionData } from './sections/app/collections/schema';

export async function replacePinnedTabs(tabs: PinnerCollectionData['tabs']) {
	const pinnedTabs = await chrome.tabs.query({ pinned: true });
	await chrome.tabs.remove(pinnedTabs.flatMap((tab) => tab.id ?? []));

	for (const data of tabs) {
		if (data.isDisabled) continue;

		const tab = await chrome.tabs.create({
			pinned: true,
			url: data.url,
			active: false
		});

		await chrome.tabs.update(tab.id, {
			muted: data.isMuted
		});
	}
}
