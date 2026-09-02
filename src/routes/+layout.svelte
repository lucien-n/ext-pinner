<script lang="ts">
	import { dev } from '$app/environment';
	import { installChromeMock } from '$lib/chrome-mock.js';

	if (dev) installChromeMock();

	import favicon from '$lib/assets/favicon.svg';
	import { initializePinner } from '$lib/hooks/usePinner.svelte';
	import AppHeader from '$lib/sections/app/app-header.svelte';
	import { ScrollArea } from '&/scroll-area';
	import './layout.css';

	const { children } = $props();

	$effect(() => {
		initializePinner();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex h-[400] w-md min-w-md flex-col gap-1 bg-background p-2">
	<div class="flex flex-col gap-1 px-5 pt-1">
		<AppHeader />
	</div>

	<ScrollArea type="scroll" class="h-full p-3 pt-0">
		{@render children()}
	</ScrollArea>
</div>
