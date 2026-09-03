<script lang="ts">
	import icons from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { Button, buttonVariants } from '&/button';
	import * as ButtonGroup from '&/button-group';
	import { Checkbox } from '&/checkbox';
	import { Label } from '&/label';

	import { getPinnerCollectionCtx } from './pinner-collection.ctx.svelte.js';

	const ctx = getPinnerCollectionCtx();

	let isWaitingForDeleteConfirmation = $state(false);
</script>

{#if isWaitingForDeleteConfirmation}
	<p class="text-md font-semibold whitespace-nowrap">{m.cozy_long_oryx_type()}</p>
	<Button
		variant="destructive"
		title={m.super_icy_baboon_compose()}
		onclick={(e) => {
			e.stopPropagation();
			ctx.delete();
		}}
	>
		{m.steep_wacky_maggot_hurl()}
	</Button>
	<Button
		variant="secondary"
		title={m.home_small_cowfish_grin()}
		onclick={(e) => {
			e.stopPropagation();
			isWaitingForDeleteConfirmation = false;
		}}
	>
		{m.strong_wacky_manatee_achieve()}
	</Button>
{:else}
	<ButtonGroup.Root onclick={(e) => e.stopPropagation()}>
		<Label class={buttonVariants({ variant: 'ghost' })} title={m.every_same_puffin_empower()}>
			{m.stout_broad_weasel_pull()}
			<Checkbox checked={ctx.isAutoload} onCheckedChange={(checked) => ctx.setAutoload(checked)} />
		</Label>

		<Button
			variant="ghost"
			title={m.sharp_wacky_giraffe_hurl()}
			size="icon"
			onclick={() => ctx.load()}
		>
			<icons.global.load />
		</Button>

		<Button
			size="icon"
			variant="ghost"
			title={m.clear_gaudy_goldfish_pick()}
			onclick={() => (isWaitingForDeleteConfirmation = true)}
		>
			<icons.global.delete />
		</Button>
	</ButtonGroup.Root>
{/if}
