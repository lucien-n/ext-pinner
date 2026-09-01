<script lang="ts">
	import { Button } from '&/button';
	import DragIcon from '@lucide/svelte/icons/grip-vertical';
	import RemoveIcon from '@lucide/svelte/icons/x';
	import { dragHandle, dragHandleZone, type DndEvent } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { getPinnerCollectionCtx } from '../pinner-collection.ctx.svelte.js';
	import AddUrlAction from './add-url-action.svelte';

	const ctx = getPinnerCollectionCtx();

	let items = $derived(ctx.data.urls.map((url) => ({ id: url, url })));

	function handleDndConsider(e: CustomEvent<DndEvent<{ id: string; url: string }>>) {
		items = e.detail.items;
	}

	function handleDndFinalize(e: CustomEvent<DndEvent<{ id: string; url: string }>>) {
		items = e.detail.items;
		ctx.reorder(items.map((i) => i.url));
	}
</script>

<p class="text-sm font-medium">
	{ctx.data.urls.length} tab{ctx.data.urls.length > 1 ? 's' : ''}
</p>

<div
	use:dragHandleZone={{
		items,
		flipDurationMs: 150,
		dropTargetStyle: {
			outline: 'none',
			'border-radius': 'var(--radius)'
		}
	}}
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
	class="flex flex-col gap-1"
>
	{#each items as item (item.id)}
		<div class="flex min-w-0 items-center justify-between" animate:flip={{ duration: 150 }}>
			<Button
				variant="link"
				href={item.url}
				target="_blank"
				class="block min-w-0 flex-1 overflow-hidden px-0 text-left text-ellipsis whitespace-nowrap"
			>
				{item.url}
			</Button>

			<div class="flex shrink-0 items-center gap-1">
				<Button
					size="icon-sm"
					variant="ghost"
					title="Remove url from collection"
					onclick={() => ctx.remove(item.url)}
				>
					<RemoveIcon />
				</Button>

				<div use:dragHandle class="cursor-grab active:cursor-grabbing">
					<DragIcon class="size-4 text-muted-foreground" />
				</div>
			</div>
		</div>
	{/each}
</div>

<AddUrlAction />
