<script lang="ts">
	import { Button } from '&/button';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let isCollapsed = $state(true);

	interface Tab extends Omit<chrome.tabs.Tab, 'url'> {
		url: string;
	}

	let pinnedTabs = $state<Tab[]>([]);

	onMount(async () => {
		const tabs = await chrome.tabs.query({ pinned: true });
		pinnedTabs = tabs.filter((tab): tab is Tab => !!tab.url);
	});
</script>

<div class="flex flex-col gap-1 text-sm text-muted-foreground">
	<Button
		size="xs"
		variant="ghost"
		class="self-start"
		title={isCollapsed ? pinnedTabs.join('\n') : 'Collapse'}
		onclick={() => (isCollapsed = !isCollapsed)}
	>
		{#if isCollapsed}
			{pinnedTabs.length} pinned tab{pinnedTabs.length > 1 ? 's' : ''}
		{:else}
			Collapse
		{/if}
	</Button>

	{#if !isCollapsed}
		<ul class="flex flex-col px-3" transition:slide>
			{#each pinnedTabs as tab (tab.index + '-' + tab.url)}
				<li class="min-w-0">
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
	{/if}
</div>
