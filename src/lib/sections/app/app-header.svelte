<script lang="ts">
	import { usePinner } from '$lib/hooks/usePinner.svelte.js';
	import PinnedTabsRecap from '$lib/sections/app/pinned-tabs-recap.svelte';
	import { Button } from '&/button';
	import { Input } from '&/input';
	import CollectionIcon from '@lucide/svelte/icons/library';
	import { slide } from 'svelte/transition';

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

<div class="flex flex-col gap-2">
	<div class="flex gap-1 p-1">
		<div class="flex w-full flex-col gap-1">
			<div class="relative">
				<CollectionIcon class="absolute left-3 my-auto size-3.5 h-full text-muted-foreground" />
				<Input
					placeholder="My Collection"
					name="new-collection-name"
					class="pl-8 text-sm placeholder:text-xs"
					oninput={() => (error = '')}
					aria-invalid={!!error}
					bind:value={newCollectionName}
				/>
			</div>
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
