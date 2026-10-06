import CollapseIcon from '@lucide/svelte/icons/chevrons-up-down';
import DownloadIcon from '@lucide/svelte/icons/download';
import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
import DragIcon from '@lucide/svelte/icons/grip-vertical';
import CollectionIcon from '@lucide/svelte/icons/library';
import AddIcon from '@lucide/svelte/icons/plus';
import SettingsIcon from '@lucide/svelte/icons/settings';
import LoadIcon from '@lucide/svelte/icons/square-arrow-out-up-right';
import DeleteIcon from '@lucide/svelte/icons/trash-2';
import UndeaphenedIcon from '@lucide/svelte/icons/volume-2';
import DeaphenedIcon from '@lucide/svelte/icons/volume-off';

export default {
	app: {
		collection: CollectionIcon
	},
	global: {
		collapse: CollapseIcon,
		load: LoadIcon,
		delete: DeleteIcon,
		add: AddIcon,
		drag: DragIcon,
		deaphened: DeaphenedIcon,
		undeaphened: UndeaphenedIcon,
		settings: SettingsIcon,
		download: DownloadIcon,
		externallink: ExternalLinkIcon
	}
};
