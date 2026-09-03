<script lang="ts">
	import icons from '$lib/icons';
	import { cn } from '$lib/shadcn/utils.js';
	import { Button } from '&/button';
	import { Input } from '&/input';
	import * as v from 'valibot';
	import { urlSchema } from '../../schema.js';
	import { getPinnerCollectionCtx } from '../pinner-collection.ctx.svelte.js';

	// todo: toggle auto mute button ?

	const ctx = getPinnerCollectionCtx();

	let newUrlInputRef = $state<HTMLInputElement | null>(null);

	let isAddShown = $state(false);
	let newTabUrl = $state('');
	const isNewUrlValid = $derived(v.safeParse(urlSchema, newTabUrl).success);

	function handleAddUrl() {
		if (isAddShown && isNewUrlValid) {
			ctx.add({ url: newTabUrl, isMuted: false });
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
		placeholder="https://myurl.com"
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
		disabled={isAddShown && !isNewUrlValid}
	>
		<icons.global.add />
		Add
	</Button>
	{#if isAddShown}
		<Button variant="secondary" onclick={() => (isAddShown = false)}>Cancel</Button>
	{/if}
</div>
