<script lang="ts">
	import { usePinner } from '$lib/hooks/usePinner.svelte.js';
	import { useUi } from '$lib/hooks/useUi.svelte';
	import icons from '$lib/icons';
	import PinnerCollectionCtx from '$lib/sections/app/collections/single/pinner-collection-ctx.svelte';
	import SingleCollection from '$lib/sections/app/collections/single/single-collection.svelte';
	import * as Accordion from '&/accordion';
	import { Button } from '&/button';
	import * as Empty from '&/empty';

	const pinner = usePinner();
	const ui = useUi();
</script>

{#if pinner.collections.length}
	<Accordion.Root type="single" class="p-2">
		{#each pinner.collections as collection (collection.id)}
			<PinnerCollectionCtx data={collection}>
				<Accordion.Item value={collection.name}>
					<SingleCollection />
				</Accordion.Item>
			</PinnerCollectionCtx>
		{/each}
	</Accordion.Root>
{:else}
	<Empty.Root>
		<Empty.Header>
			<Empty.Media variant="icon">
				<icons.app.collection />
			</Empty.Media>
			<Empty.Title>No Collections Yet</Empty.Title>
			<Empty.Description>
				You haven't created any collections yet. Get started by creating your first collection.
			</Empty.Description>
		</Empty.Header>
		<Empty.Content>
			<div class="flex gap-2">
				<Button onclick={() => ui.focusCreateCollection?.()}>Create Collection</Button>
			</div>
		</Empty.Content>
		<!-- <Button variant="link" class="text-muted-foreground" size="sm">
				<a href="#/">
					Learn More <ArrowUpRightIcon class="inline" />
				</a>
			</Button> -->
	</Empty.Root>
{/if}
