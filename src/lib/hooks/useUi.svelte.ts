let focusCreateCollection = $state<(() => void) | null>(null);
let isSettingsDialogOpen = $state(false);

export function useUi() {
	return {
		get focusCreateCollection() {
			return focusCreateCollection;
		},
		set focusCreateCollection(fn: (() => void) | null) {
			focusCreateCollection = fn;
		},
		get isSettingsDialogOpen() {
			return isSettingsDialogOpen;
		},
		closeSettingsDialog() {
			isSettingsDialogOpen = false;
		},
		openSettingsDialog() {
			isSettingsDialogOpen = true;
		}
	};
}
