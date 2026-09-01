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

<div class="flex h-[400] w-md min-w-md flex-col p-2">
	<ScrollArea type="scroll" class="h-full p-3">
		{@render children()}
	</ScrollArea>
</div>
