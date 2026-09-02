let focusCreateCollection = $state<(() => void) | null>(null);

export function useUi() {
	return {
		get focusCreateCollection() {
			return focusCreateCollection;
		},
		set focusCreateCollection(fn: (() => void) | null) {
			focusCreateCollection = fn;
		}
	};
}
