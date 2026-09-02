<script lang="ts">
	import CollectionsAccordion from '$lib/sections/app/collections/collections-accordion.svelte';
	import CreateCollectionForm from '$lib/sections/app/create-collection-form.svelte';
	import { Card, CardContent } from '&/card';
	import { ScrollArea } from '&/scroll-area';
</script>

<div class="flex flex-col gap-3 p-1">
	<CreateCollectionForm />

	<Card class="flex min-h-0 flex-1 flex-col p-0">
		<CardContent class="flex min-h-0 flex-1 flex-col p-0">
			<ScrollArea class="relative mr-0 min-h-0 flex-1 px-2">
				<CollectionsAccordion />
			</ScrollArea>
		</CardContent>
	</Card>
</div>
