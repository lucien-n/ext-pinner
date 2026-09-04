<script lang="ts">
	import { usePinner } from '$lib/hooks/usePinner.svelte';
	import icons from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { Button } from '&/button';
	import { Input } from '&/input';
	import { toast } from 'svelte-sonner';
	import type { PinnerCollectionData } from '../collections/schema';
	import { parsePinnerDataFromJSON } from './export/helpers';

	const pinner = usePinner();

	let files = $state<FileList>();

	let isLoadingFiles = $state(false);
	let isImporting = $state(false);

	async function parseCollectionsFromFiles(): Promise<PinnerCollectionData[] | null> {
		const file = files?.item(0);
		if (!file) {
			return null;
		}

		try {
			const data = JSON.parse(await file.text());

			const parsed = parsePinnerDataFromJSON(data);
			if (!parsed) {
				toast.error(m.agent_mild_pug_foster());
			} else {
				return parsed.collections;
			}
		} catch {
			toast.error(m.front_grassy_wasp_sprout());
		}

		return null;
	}

	let collectionsToImport = $state<PinnerCollectionData[] | null>();
	$effect(() => {
		(async () => {
			isLoadingFiles = true;

			collectionsToImport = await parseCollectionsFromFiles();

			isLoadingFiles = false;
		})();
	});

	const existingCollectionNames = $derived.by(() => {
		if (!collectionsToImport?.length) return [];

		const importedNames = collectionsToImport?.map((c) => c.name);
		const existingNames = pinner.collections.map((c) => c.name);

		return existingNames.filter((name) => importedNames.includes(name));
	});

	async function handleImport() {
		if (!collectionsToImport?.length) return;

		isImporting = true;

		await Promise.all(collectionsToImport.map((c) => pinner.import(c)));

		toast.success(m.civil_dry_sheep_nurture());

		files = undefined;

		isImporting = false;
	}
</script>

{#if existingCollectionNames.length}
	<p class="text-amber-500">
		Import will overwrite {#if existingCollectionNames.length > 1}
			{existingCollectionNames.slice(0, existingCollectionNames.length - 1).join(', ')} & {existingCollectionNames.slice(
				existingCollectionNames.length - 1
			)}
		{:else}
			{existingCollectionNames[0]}
		{/if}
	</p>
{/if}

<div class="flex items-center gap-1">
	<Input type="file" accept="application/json" bind:files />

	<Button
		disabled={!files?.length || isImporting || isLoadingFiles}
		onclick={handleImport}
		variant={existingCollectionNames.length ? 'destructive' : 'default'}
	>
		{#if isImporting}
			<icons.global.load class="animate-spin" />
		{/if}

		{m.civil_stale_rooster_twist()}
	</Button>
</div>
