<script lang="ts">
	import { installChromeMock } from '$lib/chrome-mock.js';
	if (dev) installChromeMock();

	import { dev } from '$app/environment';
	import icon from '$lib/assets/favicon.svg';
	import { initializePinner } from '$lib/hooks/usePinner.svelte';
	import { useUi } from '$lib/hooks/useUi.svelte';
	import AppHeader from '$lib/sections/app/app-header.svelte';
	import SettingsDialog from '$lib/sections/app/settings/settings-dialog.svelte';
	import { ScrollArea } from '&/scroll-area';
	import { Toaster } from '&/sonner';
	import { mode, ModeWatcher } from 'mode-watcher';
	import { fade } from 'svelte/transition';
	import './layout.css';

	const { children } = $props();

	const ui = useUi();

	$effect(() => {
		initializePinner();
	});
</script>

<svelte:head><link rel="icon" href={icon} /></svelte:head>

<Toaster richColors theme="light" />

<ModeWatcher disableHeadScriptInjection />

{#key mode.current}
	<div
		class="relative flex min-h-100 w-md min-w-md flex-col gap-1 bg-background p-2"
		in:fade={{ duration: 200 }}
	>
		<div class="flex flex-col gap-1 px-5 pt-1"><AppHeader /></div>
		<ScrollArea type="scroll" class="h-full p-3 pt-0">{@render children()}</ScrollArea>

		{#if ui.isSettingsDialogOpen}
			<SettingsDialog isOpen={ui.isSettingsDialogOpen} onClose={() => ui.closeSettingsDialog()} />
		{/if}
	</div>
{/key}
