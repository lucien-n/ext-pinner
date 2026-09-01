<script lang="ts">
	import { Button } from '&/button';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	const COLLAPSED_SHOWN_AMOUNT = 2;

	let isCollapsed = $state(true);

	interface Tab extends Omit<chrome.tabs.Tab, 'url'> {
		url: string;
	}

	let allPinnedTabs = $state<Tab[]>([]);
	const [collapsedShownTabs, collapsedHiddenTabs] = $derived([
		allPinnedTabs.slice(0, COLLAPSED_SHOWN_AMOUNT),
		allPinnedTabs.slice(COLLAPSED_SHOWN_AMOUNT)
	]);

	onMount(async () => {
		const pinnedTabs = await chrome.tabs.query({ pinned: true });
		allPinnedTabs = pinnedTabs.filter((tab): tab is Tab => !!tab.url);
	});
</script>

<div class="flex flex-col gap-1 text-sm text-muted-foreground">
	<p class="font-medium">{allPinnedTabs.length} pinned tab{allPinnedTabs.length > 1 ? 's' : ''}</p>
	<ul class="flex flex-col">
		{#each isCollapsed ? collapsedShownTabs : allPinnedTabs as tab (tab.index + '-' + tab.url)}
			<li class="min-w-0" transition:slide>
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
			</li>
		{/each}
	</ul>

	<div>
		{#if allPinnedTabs.length > COLLAPSED_SHOWN_AMOUNT}
			<Button
				size="xs"
				variant="link"
				class="px-0 font-medium"
				title={isCollapsed ? collapsedHiddenTabs.join('\n') : 'Collapse'}
				onclick={() => (isCollapsed = !isCollapsed)}
			>
				{#if isCollapsed}
					And {allPinnedTabs.length - COLLAPSED_SHOWN_AMOUNT} more · Show all
				{:else}
					Collapse
				{/if}
			</Button>
		{/if}
	</div>
</div>
