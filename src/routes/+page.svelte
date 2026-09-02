<script lang="ts">
	import PinnerCollectionCtx from '$lib/sections/app/collections/single/pinner-collection-ctx.svelte';
	import SingleCollection from '$lib/sections/app/collections/single/single-collection.svelte';
	import CreateCollectionForm from '$lib/sections/app/create-collection-form.svelte';
	import * as Accordion from '&/accordion';
	import { Card, CardContent } from '&/card';
	import { ScrollArea } from '&/scroll-area';
	import { usePinner } from '../lib/hooks/usePinner.svelte.js';

	const pinner = usePinner();
</script>

<div class="flex flex-col gap-3 p-1">
	<CreateCollectionForm />

	<Card class="flex min-h-0 flex-1 flex-col p-0">
		<CardContent class="flex min-h-0 flex-1 flex-col p-0">
			<ScrollArea class="relative mr-0 min-h-0 flex-1 px-2">
				<Accordion.Root type="single" class="p-2">
					{#each pinner.collections as collection (collection.id)}
						<PinnerCollectionCtx data={collection}>
							<Accordion.Item value={collection.name}>
								<SingleCollection />
							</Accordion.Item>
						</PinnerCollectionCtx>
					{/each}
				</Accordion.Root>
			</ScrollArea>
		</CardContent>
	</Card>
</div>
