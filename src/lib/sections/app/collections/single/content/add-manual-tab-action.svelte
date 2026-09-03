<script lang="ts">
	import icons from '$lib/icons';
	import { cn } from '$lib/shadcn/utils.js';
	import { Button } from '&/button';
	import { Input } from '&/input';
	import * as v from 'valibot';
	import { urlSchema } from '../../schema';
	import { getPinnerCollectionCtx } from '../pinner-collection.ctx.svelte.js';

	const ctx = getPinnerCollectionCtx();

	let newUrlInputRef = $state<HTMLInputElement | null>(null);

	let isAddShown = $state(false);

	let newTabUrl = $state('');
	const formattedNewTabUrl = $derived.by(() => {
		const inputs = [newTabUrl, `https://${newTabUrl}`];
		for (const input of inputs) {
			const result = v.safeParse(urlSchema, input);
			if (result.success) return result.output;
		}

		return '';
	});

	const isNewTabUrlValid = $derived(v.safeParse(urlSchema, formattedNewTabUrl).success);

	function handleAddUrl() {
		if (isAddShown && isNewTabUrlValid) {
			ctx.add({ url: formattedNewTabUrl, isMuted: false });
		} else {
			newUrlInputRef?.focus();
		}

		isAddShown = !isAddShown;

		newTabUrl = '';
	}
</script>

<div class="flex gap-1">
	<Input
		bind:ref={newUrlInputRef}
		bind:value={newTabUrl}
		class={cn(
			'w-0 min-w-0 border-0 p-0 opacity-0 transition-all duration-300 ease-in-out',
			isAddShown && 'w-full! border! p-2! opacity-100!'
		)}
		placeholder="https://myurl.com or myurl.com"
		type="url"
		spellcheck="false"
		onkeydown={(e) => {
			if (e.key !== 'Enter') return;

			handleAddUrl();
		}}
	/>
	<Button
		variant={isAddShown ? 'default' : 'ghost'}
		onclick={handleAddUrl}
		disabled={isAddShown && !isNewTabUrlValid}
	>
		<icons.global.add />
		Add
	</Button>
	{#if isAddShown}
		<Button variant="secondary" onclick={() => (isAddShown = false)}>Cancel</Button>
	{/if}
</div>
