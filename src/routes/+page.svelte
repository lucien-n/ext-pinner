<script lang="ts">
	import AppHeader from '$lib/sections/app/app-header.svelte';
	import PinnerCollectionCtx from '$lib/sections/app/collections/single/pinner-collection-ctx.svelte';
	import SingleCollection from '$lib/sections/app/collections/single/single-collection.svelte';
	import * as Accordion from '&/accordion';
	import { Separator } from '&/separator';
	import { usePinner } from '../lib/hooks/usePinner.svelte.js';

	const pinner = usePinner();
</script>

<div class="flex flex-col gap-3">
	<AppHeader />

	<Separator />

	<div class="flex flex-col gap-3 px-2">
		<Accordion.Root type="single">
			{#each pinner.collections as collection (collection.id)}
				<PinnerCollectionCtx data={collection}>
					<Accordion.Item value="{collection.name}-{collection.urls.join(',')}">
						<SingleCollection />
					</Accordion.Item>
				</PinnerCollectionCtx>
			{/each}
		</Accordion.Root>
	</div>
</div>
