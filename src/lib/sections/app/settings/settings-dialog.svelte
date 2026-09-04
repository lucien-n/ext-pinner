<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import * as Dialog from '&/dialog';
	import { Label } from '&/label';
	import LanguageSelect from './language-select.svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	const { isOpen, onClose }: Props = $props();
</script>

<Dialog.Root
	open={isOpen}
	onOpenChange={(newIsOpen) => {
		if (newIsOpen !== false) return;

		onClose();
	}}
>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{m.noble_east_crab_play()}</Dialog.Title>
			<Dialog.Description>{m.plain_due_rat_enchant()}</Dialog.Description>
		</Dialog.Header>

		<div class="flex flex-col items-start gap-5">
			<Label class="flex w-full flex-col items-start gap-2">
				{m.top_trite_shad_chop()}

				<LanguageSelect />
			</Label>
		</div>

		<Dialog.Footer>
			<Dialog.Close onclick={onClose}>{m.giant_kind_jay_nail()}</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
