import { browser, dev } from '$app/env';

export function installChromeMock() {
	if (!dev || !browser) return;

	const store = new Map<string, unknown>(
		JSON.parse(localStorage.getItem('__chrome_mock_storage__') ?? '[]')
	);

	function persist() {
		localStorage.setItem('__chrome_mock_storage__', JSON.stringify([...store.entries()]));
	}

	globalThis.chrome = {
		storage: {
			local: {
				// @ts-expect-error dev-only mock
				async get(key: string | string[] | null) {
					if (key == null) return Object.fromEntries(store);
					const keys = Array.isArray(key) ? key : [key];
					return Object.fromEntries(keys.filter((k) => store.has(k)).map((k) => [k, store.get(k)]));
				},
				async set(items: Record<string, unknown>) {
					for (const [k, v] of Object.entries(items)) store.set(k, v);
					persist();
				},
				async remove(key: string | string[]) {
					for (const k of Array.isArray(key) ? key : [key]) store.delete(k);
					persist();
				}
			}
		},
		tabs: {
			async query() {
				console.log('[mock] chrome.tabs.query called');
				return [
					{ id: 0, url: 'https://super.com' },
					{ id: 1, url: 'https://minecraft.net' }
				] as chrome.tabs.Tab[];
			},
			// @ts-expect-error dev-only mock
			async create(opts: unknown) {
				console.log('[mock] chrome.tabs.create', opts);
			}
		},
		runtime: {
			// @ts-expect-error dev-only mock
			onStartup: { addListener: () => {} },
			// @ts-expect-error dev-only mock
			onInstalled: { addListener: () => {} }
		}
	};
}
