<script lang="ts">
	import { Button, buttonVariants } from '&/button';
	import { Checkbox } from '&/checkbox';
	import { Label } from '&/label';
	import DeleteIcon from '@lucide/svelte/icons/trash-2';
	import { getPinnerCollectionCtx } from './pinner-collection.ctx.svelte.js';

	const ctx = getPinnerCollectionCtx();

	let isWaitingForDeleteConfirmation = $state(false);
</script>

{#if isWaitingForDeleteConfirmation}
	<p class="text-md font-semibold whitespace-nowrap">Are you sure ?</p>
	<Button
		variant="destructive"
		title="Confirm collection deletion (unrecoverable)"
		onclick={() => ctx.delete()}
	>
		Yes
	</Button>
	<Button
		variant="secondary"
		title="Cancel collection deletion"
		onclick={() => (isWaitingForDeleteConfirmation = false)}
	>
		Cancel
	</Button>
{:else}
	<Label class={buttonVariants({ variant: 'ghost' })}>
		Autoload
		<Checkbox checked={ctx.isAutoload} onCheckedChange={(checked) => ctx.setAutoload(checked)} />
	</Label>

	<Button
		variant="secondary"
		title="Load collection - replaces currently pinned tabs"
		onclick={() => ctx.load()}
	>
		Load
	</Button>

	<Button
		size="icon"
		variant="destructive"
		title="Delete collection"
		onclick={() => (isWaitingForDeleteConfirmation = true)}
	>
		<DeleteIcon />
	</Button>
{/if}
