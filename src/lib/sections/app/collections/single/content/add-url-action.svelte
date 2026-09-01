<script lang="ts">
	import { cn } from '$lib/shadcn/utils.js';
	import { Button } from '&/button';
	import { Input } from '&/input';
	import AddIcon from '@lucide/svelte/icons/plus';
	import * as v from 'valibot';
	import { urlSchema } from '../../schema.js';
	import { getPinnerCollectionCtx } from '../pinner-collection.ctx.svelte.js';

	const ctx = getPinnerCollectionCtx();

	let newUrlInputRef = $state<HTMLInputElement | null>(null);

	let isAddShown = $state(false);
	let newUrl = $state('');
	const isNewUrlValid = $derived(v.safeParse(urlSchema, newUrl).success);

	function handleAddUrl() {
		if (isAddShown && isNewUrlValid) {
			ctx.add(newUrl);
		} else {
			newUrlInputRef?.focus();
		}

		isAddShown = !isAddShown;
	}
</script>

<div class="flex gap-1">
	<Input
		bind:ref={newUrlInputRef}
		class={cn(
			'w-0 min-w-0 border-0 p-0 opacity-0 transition-all duration-300 ease-in-out',
			isAddShown && 'w-full! border! p-2! opacity-100!'
		)}
		placeholder="https://myurl.com"
		type="url"
		bind:value={newUrl}
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
		<AddIcon />
		Add
	</Button>
	{#if isAddShown}
		<Button variant="secondary" onclick={() => (isAddShown = false)}>Cancel</Button>
	{/if}
</div>
