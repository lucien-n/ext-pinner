<script lang="ts">
	import icons from '$lib/icons';
	import { Button, buttonVariants } from '&/button';
	import * as ButtonGroup from '&/button-group';
	import { Checkbox } from '&/checkbox';
	import { Label } from '&/label';

	import { getPinnerCollectionCtx } from './pinner-collection.ctx.svelte.js';

	const ctx = getPinnerCollectionCtx();

	let isWaitingForDeleteConfirmation = $state(false);
</script>

{#if isWaitingForDeleteConfirmation}
	<p class="text-md font-semibold whitespace-nowrap">Are you sure ?</p>
	<Button
		variant="destructive"
		title="Confirm collection deletion (unrecoverable)"
		onclick={(e) => {
			e.stopPropagation();
			ctx.delete();
		}}
	>
		Yes
	</Button>
	<Button
		variant="secondary"
		title="Cancel collection deletion"
		onclick={(e) => {
			e.stopPropagation();
			isWaitingForDeleteConfirmation = false;
		}}
	>
		Cancel
	</Button>
{:else}
	<ButtonGroup.Root onclick={(e) => e.stopPropagation()}>
		<Label class={buttonVariants({ variant: 'ghost' })}>
			Autoload
			<Checkbox checked={ctx.isAutoload} onCheckedChange={(checked) => ctx.setAutoload(checked)} />
		</Label>

		<Button
			variant="ghost"
			title="Load collection - replaces currently pinned tabs"
			size="icon"
			onclick={() => ctx.load()}
		>
			<icons.global.load />
		</Button>

		<Button
			size="icon"
			variant="ghost"
			title="Delete collection"
			onclick={() => (isWaitingForDeleteConfirmation = true)}
		>
			<icons.global.delete />
		</Button>
	</ButtonGroup.Root>
{/if}
