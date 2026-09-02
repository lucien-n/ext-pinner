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
	<div class="items-ce flex gap-2 px-5">
		<img src="icon.svg" alt="Pinner icon" class="w-4" />
		<h1 class="text-md font-semibold">Pinner</h1>
	</div>

	<ScrollArea type="scroll" class="h-full px-3 pb-3">
		{@render children()}
	</ScrollArea>
</div>
