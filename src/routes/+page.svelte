<script lang="ts">
	import PinnerCollectionCtx from '$lib/sections/app/collections/single/pinner-collection-ctx.svelte';
	import SingleCollection from '$lib/sections/app/collections/single/single-collection.svelte';
	import { Button } from '&/button';
	import { Input } from '&/input';
	import { Separator } from '&/separator';
	import { slide } from 'svelte/transition';
	import { usePinner } from '../lib/hooks/usePinner.svelte.js';
	import PinnedTabsRecap from '../lib/sections/app/pinned-tabs-recap.svelte';

	const pinner = usePinner();

	let newCollectionName = $state('');
	let error = $state<string | undefined>();

	let existingCollection = $derived(newCollectionName && pinner.getByName(newCollectionName));

	async function handleSaveCollection() {
		const pinnedTabs = await chrome.tabs.query({ pinned: true });

		error = await pinner.save({
			name: newCollectionName,
			urls: pinnedTabs.flatMap((tab) => tab.url ?? [])
		});

		if (!error) {
			newCollectionName = '';
		}
	}
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-col gap-2">
		<div class="flex items-center gap-1">
			<div class="flex w-full flex-col gap-1 p-1">
				<Input
					bind:value={newCollectionName}
					placeholder="My Collection"
					name="new-collection-name"
					oninput={() => (error = '')}
					aria-invalid={!!error}
				/>
				{#if error}
					<p class="text-xs text-destructive">{error}</p>
				{/if}
			</div>
			<Button
				title="Save collection{existingCollection ? ' (overwriting an existing collection)' : ''}"
				onclick={handleSaveCollection}
			>
				Save
			</Button>
		</div>

		{#if existingCollection}
			<p class="text-sm font-semibold text-amber-500" transition:slide>
				Overwriting collection "{existingCollection.name}"
			</p>
		{/if}

		<PinnedTabsRecap />
	</div>

	<Separator />

	<div class="flex flex-col gap-3">
		{#each pinner.collections as collection (collection.id)}
			<PinnerCollectionCtx data={collection}>
				<SingleCollection />
			</PinnerCollectionCtx>
		{/each}
	</div>
</div>
