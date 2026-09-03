<script lang="ts">
	import { usePinnedTabs } from '$lib/hooks/usePinnedTabs.svelte';
	import icons from '$lib/icons';
	import { Button, buttonVariants } from '&/button';
	import * as Collapsible from '&/collapsible';
	import { slide } from 'svelte/transition';

	let isOpen = $state(false);
	const pinnedTabs = usePinnedTabs();
</script>

<Collapsible.Root class="flex flex-col gap-1" bind:open={isOpen}>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<img src="icon.svg" alt="Pinner icon" class="w-4" />
			<h1 class="text-lg font-semibold">Pinner</h1>
		</div>

		<Collapsible.Trigger
			class={buttonVariants({
				size: 'xs',
				variant: 'ghost',
				class: 'self-start text-xs text-muted-foreground'
			})}
			title={isOpen
				? 'Collapse'
				: pinnedTabs.current
						.map((tab) => `${tab.url}${tab.mutedInfo?.muted ? ' - Muted' : ''}`)
						.join('\n')}
			disabled={!pinnedTabs.current.length}
		>
			{pinnedTabs.current.length || 'No'} currently pinned tab{pinnedTabs.current.length > 1
				? 's'
				: ''}

			<icons.global.collapse />
		</Collapsible.Trigger>
	</div>

	<Collapsible.Content forceMount class="px-3 text-muted-foreground">
		{#snippet child({ props, open })}
			{#if open}
				<div {...props} transition:slide={{ duration: 200 }}>
					{#each pinnedTabs.current as tab (tab.index + '-' + tab.url)}
						{@const hostname = new URL(tab.url).hostname}
						<div class="flex items-center gap-1">
							<img
								src="https://www.google.com/s2/favicons?domain={hostname}&sz=32"
								alt="{hostname}'s icon"
								class="size-4"
							/>

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
						</div>
					{/each}
				</div>
			{/if}
		{/snippet}
	</Collapsible.Content>
</Collapsible.Root>
