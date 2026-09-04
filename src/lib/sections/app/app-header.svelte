<script lang="ts">
	import icon from '$lib/assets/favicon.svg';
	import LinkPreview from '$lib/components/link-preview.svelte';
	import ToggleModeButton from '$lib/components/toggle-mode-button.svelte';
	import { usePinnedTabs } from '$lib/hooks/usePinnedTabs.svelte';
	import { useUi } from '$lib/hooks/useUi.svelte';
	import icons from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { Button, buttonVariants } from '&/button';
	import * as Collapsible from '&/collapsible';
	import { SvelteURL } from 'svelte/reactivity';
	import { slide } from 'svelte/transition';

	const pinnedTabs = usePinnedTabs();
	const ui = useUi();

	let isOpen = $state(false);
</script>

<Collapsible.Root class="flex flex-col gap-1" bind:open={isOpen}>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<img src={icon} alt="Pinner icon" class="w-4" />
			<h1 class="text-lg font-semibold">Pinner</h1>
		</div>

		<div class="flex items-center gap-1">
			<Collapsible.Trigger
				class={buttonVariants({
					size: 'xs',
					variant: 'ghost',
					class: 'text-xs text-muted-foreground'
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

			<ToggleModeButton />

			<Button size="icon-sm" variant="ghost" onclick={() => ui.openSettingsDialog()}>
				<icons.global.settings />
			</Button>
		</div>
	</div>

	<Collapsible.Content forceMount class="px-3 text-muted-foreground">
		{#snippet child({ props, open })}
			{#if open}
				<div {...props} transition:slide={{ duration: 200 }}>
					{#each pinnedTabs.current as tab (tab.index + '-' + tab.url)}
						<div class="flex items-center gap-1">
							<LinkPreview
								url={new SvelteURL(tab.url)}
								variant="full"
								onClick={(e) => {
									e.preventDefault();

									chrome.tabs.highlight({
										tabs: [tab.index]
									});
								}}
							/>

							{#if tab.mutedInfo?.muted}
								<icons.global.deaphened
									class="size-4 text-muted-foreground"
									title={m.awake_noble_skunk_pause()}
								/>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		{/snippet}
	</Collapsible.Content>
</Collapsible.Root>
