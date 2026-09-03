<script lang="ts">
	import LinkPreview from '$lib/components/link-preview.svelte';
	import icons from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { Button, buttonVariants } from '&/button';
	import * as ButtonGroup from '&/button-group';
	import { Checkbox } from '&/checkbox';
	import * as Empty from '&/empty';
	import { Label } from '&/label';
	import { dragHandle, dragHandleZone, type DndEvent } from 'svelte-dnd-action';
	import { SvelteURL } from 'svelte/reactivity';
	import { slide } from 'svelte/transition';
	import type { TabData } from '../../schema';
	import { getPinnerCollectionCtx } from '../pinner-collection.ctx.svelte.js';
	import AddManualTabAction from './add-manual-tab-action.svelte';

	type TypeDataWithDndId = TabData & { id: string };

	const ctx = getPinnerCollectionCtx();

	let shouldShowFullUrls = $state(false);

	let items = $derived(ctx.data.tabs.map((tab) => ({ ...tab, id: tab.url })));

	function handleDndConsider(e: CustomEvent<DndEvent<TypeDataWithDndId>>) {
		items = e.detail.items;
	}

	function handleDndFinalize(e: CustomEvent<DndEvent<TypeDataWithDndId>>) {
		items = e.detail.items;
		ctx.reorder(items);
	}
</script>

<div class="flex flex-col gap-1 px-2">
	<div class="flex justify-between">
		<p class="text-sm font-medium">
			{m.misty_funny_jan_pause({ count: ctx.data.tabs.length })}
		</p>

		<Label
			class={buttonVariants({ size: 'xs', variant: 'ghost' })}
			title={m.smart_loved_mongoose_dart()}
		>
			{m.livid_every_dragonfly_rise()}
			<Checkbox bind:checked={shouldShowFullUrls} />
		</Label>
	</div>

	{#if items.length}
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
				<div class="flex min-w-0 items-center justify-between" transition:slide>
					<div class="flex items-center gap-1">
						<LinkPreview
							url={new SvelteURL(item.url)}
							variant={shouldShowFullUrls ? 'full' : 'short'}
						/>
					</div>

					<div class="flex shrink-0 items-center gap-1">
						<ButtonGroup.Root>
							<Button
								size="icon-sm"
								variant="ghost"
								title={item.isMuted ? m.bland_level_crocodile_mix() : m.only_moving_samuel_harbor()}
								onclick={() => ctx.toggleIsMuted(item.url)}
							>
								{#if item.isMuted}
									<icons.global.deaphened />
								{:else}
									<icons.global.undeaphened />
								{/if}
							</Button>
							<Button
								size="icon-sm"
								variant="ghost"
								title={m.busy_quaint_monkey_clip()}
								onclick={() => ctx.remove(item.url)}
							>
								<icons.global.remove />
							</Button>
						</ButtonGroup.Root>

						<div use:dragHandle class="cursor-grab active:cursor-grabbing">
							<icons.global.drag class="size-4 text-muted-foreground" />
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<Empty.Root>
			<Empty.Header>
				<Empty.Title>Empty collection</Empty.Title>
				<Empty.Description>
					This collection doesn't have any tabs yet.
					<br />
					Add one by entering a url below.
				</Empty.Description>
			</Empty.Header>
		</Empty.Root>
	{/if}

	<AddManualTabAction />
</div>
