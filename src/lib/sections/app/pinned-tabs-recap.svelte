<script lang="ts">
	import { Button, buttonVariants } from '&/button';
	import * as Collapsible from '&/collapsible';
	import CollapseIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let isOpen = $state(false);

	interface Tab extends Omit<chrome.tabs.Tab, 'url'> {
		url: string;
	}

	let pinnedTabs = $state<Tab[]>([]);

	onMount(async () => {
		const tabs = await chrome.tabs.query({ pinned: true });
		pinnedTabs = tabs.filter((tab): tab is Tab => !!tab.url);
	});
</script>

<Collapsible.Root class="flex flex-col gap-1 text-sm text-muted-foreground" bind:open={isOpen}>
	<Collapsible.Trigger
		class={buttonVariants({ size: 'xs', variant: 'ghost', class: 'self-start' })}
		title={isOpen ? 'Collapse' : pinnedTabs.join('\n')}
	>
		{#if isOpen}
			Collapse
		{:else}
			{pinnedTabs.length} pinned tab{pinnedTabs.length > 1 ? 's' : ''}
		{/if}

		<CollapseIcon />
	</Collapsible.Trigger>

	<Collapsible.Content forceMount class="px-3">
		{#snippet child({ props, open })}
			{#if open}
				<div {...props} transition:slide={{ duration: 200 }}>
					{#each pinnedTabs as tab (tab.index + '-' + tab.url)}
						<Button
							variant="link"
							class="block w-full min-w-0 overflow-hidden p-0 text-left text-sm text-ellipsis whitespace-nowrap text-inherit"
							title={tab.url}
							onclick={async () => {
								await chrome.tabs.highlight({
									tabs: [tab.index]
								});
							}}
						>
							{tab.url}
						</Button>
					{/each}
				</div>
			{/if}
		{/snippet}
	</Collapsible.Content>
</Collapsible.Root>
