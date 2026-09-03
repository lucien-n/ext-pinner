<script lang="ts">
	import { Button } from '&/button';
	import type { SvelteURL } from 'svelte/reactivity';

	interface Props {
		url: SvelteURL;
		variant?: 'short' | 'full';
	}

	const { url, variant = 'short' }: Props = $props();
</script>

<img
	src="https://www.google.com/s2/favicons?domain={url.hostname}&sz=32"
	alt="{url.hostname}'s icon"
	class="mt-1 size-4"
/>

<Button
	variant="link"
	href={url.href}
	target="_blank"
	class="block min-w-0 flex-1 overflow-hidden px-0 py-0 text-left font-normal text-ellipsis whitespace-nowrap"
>
	{#if variant === 'full'}
		{url.href}
	{:else}
		{url.hostname}
	{/if}
</Button>
