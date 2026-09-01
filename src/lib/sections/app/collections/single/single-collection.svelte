<script lang="ts">
	import { cn } from '$lib/shadcn/utils.js';
	import { buttonVariants } from '&/button';
	import * as Collapsible from '&/collapsible';
	import CollapseIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { slide } from 'svelte/transition';
	import SingleCollectionContent from './content/single-collection-content.svelte';
	import { getPinnerCollectionCtx } from './pinner-collection.ctx.svelte.js';
	import SingleCollectionActions from './single-collection-actions.svelte';

	const ctx = getPinnerCollectionCtx();
</script>

<Collapsible.Root class="space-y-2">
	<div class="flex min-w-0 items-center gap-5" transition:slide>
		<p
			class={cn(
				'ml-1 min-w-0 flex-1 overflow-hidden text-base text-ellipsis whitespace-nowrap',
				ctx.isAutoload && 'font-semibold'
			)}
			title={ctx.data.name}
		>
			{ctx.data.name}
		</p>

		<div class="flex shrink-0 items-center gap-1">
			<SingleCollectionActions />

			<Collapsible.Trigger
				class={buttonVariants({ variant: 'ghost', size: 'sm', class: 'w-9 shrink-0 p-0' })}
				disabled={!ctx.data.urls.length}
			>
				<CollapseIcon />
				<span class="sr-only">Toggle</span>
			</Collapsible.Trigger>
		</div>
	</div>
	<Collapsible.Content forceMount class="space-y-2 px-2">
		{#snippet child({ props, open })}
			{#if open}
				<div {...props} transition:slide={{ duration: 200 }}>
					<SingleCollectionContent />
				</div>
			{/if}
		{/snippet}
	</Collapsible.Content>
</Collapsible.Root>
