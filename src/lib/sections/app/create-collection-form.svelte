<script lang="ts">
	import { usePinnedTabs } from '$lib/hooks/usePinnedTabs.svelte';
	import { usePinner } from '$lib/hooks/usePinner.svelte.js';
	import { useUi } from '$lib/hooks/useUi.svelte';
	import icons from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { Button } from '&/button';
	import { Input } from '&/input';
	import { slide } from 'svelte/transition';

	const pinner = usePinner();
	const ui = useUi();
	const pinnedTabs = usePinnedTabs();

	let inputEl = $state<HTMLInputElement | null>(null);
	$effect(() => {
		ui.focusCreateCollection = () => inputEl?.focus();

		return () => {
			ui.focusCreateCollection = null;
		};
	});

	let newCollectionName = $state('');
	let error = $state<string | undefined>();

	let existingCollection = $derived(newCollectionName && pinner.getByName(newCollectionName));

	async function handleSaveCollection() {
		error = await pinner.save({
			name: newCollectionName,
			tabs: pinnedTabs.current.flatMap((tab) =>
				tab.url ? { url: tab.url, isMuted: !!tab.mutedInfo?.muted } : []
			)
		});

		if (!error) {
			newCollectionName = '';
		}
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex gap-1">
		<div class="flex w-full flex-col gap-1">
			<div class="relative">
				<icons.app.collection
					class="absolute left-3 my-auto size-3.5 h-full text-muted-foreground"
				/>
				<Input
					placeholder={m.late_orange_squid_quell()}
					name="new-collection-name"
					class="bg-card pl-8 text-sm placeholder:text-xs"
					oninput={() => (error = '')}
					aria-invalid={!!error}
					onkeydown={(e) => {
						if (e.key !== 'Enter') return;

						handleSaveCollection();
					}}
					bind:value={newCollectionName}
					bind:ref={inputEl}
				/>
			</div>
			{#if error}
				<p class="text-xs text-destructive">{error}</p>
			{/if}
		</div>
		<Button
			title="{m.fuzzy_only_cod_grow()}{existingCollection ? ` ${m.best_hour_fly_earn()}` : ''}"
			onclick={handleSaveCollection}
		>
			{m.extra_cozy_cuckoo_emerge()}
		</Button>
	</div>

	{#if existingCollection}
		<p class="text-sm font-semibold text-amber-500" transition:slide>
			{m.large_sharp_myna_nail({ name: existingCollection.name })}
		</p>
	{/if}
</div>
