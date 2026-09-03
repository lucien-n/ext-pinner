<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import * as Accordion from '&/accordion';
	import { slide } from 'svelte/transition';
	import SingleCollectionContent from './content/single-collection-content.svelte';
	import { getPinnerCollectionCtx } from './pinner-collection.ctx.svelte.js';
	import SingleCollectionActions from './single-collection-actions.svelte';

	const ctx = getPinnerCollectionCtx();
</script>

<Accordion.Trigger class="items-center gap-1 hover:no-underline">
	<div class="flex w-full min-w-0 items-center gap-2" transition:slide>
		<p
			class="ml-1 min-w-0 overflow-hidden text-base text-ellipsis whitespace-nowrap"
			title={ctx.data.name}
		>
			{ctx.data.name}
		</p>
		<p class="text-xs text-muted-foreground italic">
			{m.misty_funny_jan_pause({ count: ctx.data.tabs.length })}
		</p>
	</div>

	<div class="flex items-center gap-1">
		<SingleCollectionActions />
	</div>
</Accordion.Trigger>

<Accordion.Content>
	<SingleCollectionContent />
</Accordion.Content>
