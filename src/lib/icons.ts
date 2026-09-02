import CollapseIcon from '@lucide/svelte/icons/chevrons-up-down';
import DragIcon from '@lucide/svelte/icons/grip-vertical';
import CollectionIcon from '@lucide/svelte/icons/library';
import AddIcon from '@lucide/svelte/icons/plus';
import LoadIcon from '@lucide/svelte/icons/square-arrow-out-up-right';
import DeleteIcon from '@lucide/svelte/icons/trash-2';
import RemoveIcon from '@lucide/svelte/icons/x';

export default {
	app: {
		collection: CollectionIcon
	},
	global: {
		collapse: CollapseIcon,
		load: LoadIcon,
		delete: DeleteIcon,
		add: AddIcon,
		remove: RemoveIcon,
		drag: DragIcon
	}
};
