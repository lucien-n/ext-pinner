<script lang="ts">
	import { dev } from '$app/environment';
	import { installChromeMock } from '$lib/chrome-mock.js';

	if (dev) installChromeMock();

	import favicon from '$lib/assets/favicon.svg';
	import { ScrollArea } from '&/scroll-area';
	import './layout.css';

	const { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex h-[400] w-md min-w-md flex-col gap-1 bg-background p-2">
	<div class="flex items-center gap-2 px-5 pt-1">
		<img src="icon.svg" alt="Pinner icon" class="w-4" />
		<h1 class="text-lg font-semibold">Pinner</h1>
	</div>

	<ScrollArea type="scroll" class="h-full p-3 pt-2">
		{@render children()}
	</ScrollArea>
</div>
