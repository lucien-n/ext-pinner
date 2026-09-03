<script lang="ts">
	import { Button } from '&/button';
	import type { SvelteURL } from 'svelte/reactivity';

	interface Props {
		url: SvelteURL;
		variant?: 'short' | 'full';
		onClick?: (ev: Event) => void;
	}

	const { url, variant = 'short', onClick }: Props = $props();
</script>

<img
	src="https://www.google.com/s2/favicons?domain={url.hostname}&sz=32"
	alt="{url.hostname}'s icon"
	class="size-4"
/>

<Button
	variant="link"
	href={url.href}
	target="_blank"
	class="mt-2 block min-w-0 flex-1 overflow-hidden px-0 py-0 text-left font-normal text-ellipsis whitespace-nowrap"
	onclick={onClick}
>
	{#if variant === 'full'}
		{url.href}
	{:else}
		{url.hostname}
	{/if}
</Button>
