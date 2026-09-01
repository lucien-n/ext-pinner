export async function replacePinnedUrls(urls: string[]) {
	const pinnedTabs = await chrome.tabs.query({ pinned: true });
	for (const pinnedTab of pinnedTabs) {
		if (!pinnedTab.id) continue;

		await chrome.tabs.remove(pinnedTab.id);
	}

	for (const url of urls) {
		await chrome.tabs.create({
			pinned: true,
			url
		});
	}
}
