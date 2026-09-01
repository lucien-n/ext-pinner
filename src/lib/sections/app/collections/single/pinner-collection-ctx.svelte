<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PinnerCollectionData } from '../schema.js';
	import { setPinnerCollectionCtx } from './pinner-collection.ctx.svelte.js';

	interface Props {
		data: PinnerCollectionData;
		children: Snippet;
	}

	const { data, children }: Props = $props();

	// svelte-ignore state_referenced_locally
	const ctx = setPinnerCollectionCtx(data);

	$effect(() => {
		ctx.data = data;
	});
</script>

{@render children()}
