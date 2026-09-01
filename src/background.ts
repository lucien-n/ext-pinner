import { replacePinnedUrls } from '$lib/helpers.js';
import { loadPinnerData } from '$lib/pinner-storage.js';

chrome.runtime.onStartup.addListener(async () => {
	const data = await loadPinnerData();

	const autoloadedCollection = data?.collections.find((c) => c.id === data.autoloadId);
	if (!autoloadedCollection) return;

	await replacePinnedUrls(autoloadedCollection.urls);
});
