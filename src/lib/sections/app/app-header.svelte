<script lang="ts">
	import LinkPreview from '$lib/components/link-preview.svelte';
	import { usePinnedTabs } from '$lib/hooks/usePinnedTabs.svelte';
	import icons from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { Button, buttonVariants } from '&/button';
	import * as Collapsible from '&/collapsible';
	import { SvelteURL } from 'svelte/reactivity';
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
				? m.green_inclusive_bulldog_splash()
				: pinnedTabs.current
						.map(
							(tab) =>
								`${tab.url}${tab.mutedInfo?.muted ? ` - ${m.awake_noble_skunk_pause()}` : ''}`
						)
						.join('\n')}
			disabled={!pinnedTabs.current.length}
		>
			{m.good_active_horse_dial({ count: pinnedTabs.current.length })}

			<icons.global.collapse />
		</Collapsible.Trigger>
	</div>

	<Collapsible.Content forceMount class="px-3 text-muted-foreground">
		{#snippet child({ props, open })}
			{#if open}
				<div {...props} transition:slide={{ duration: 200 }}>
					{#each pinnedTabs.current as tab (tab.index + '-' + tab.url)}
						<div class="flex items-center gap-1">
							<LinkPreview url={new SvelteURL(tab.url)} variant="full" />

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
