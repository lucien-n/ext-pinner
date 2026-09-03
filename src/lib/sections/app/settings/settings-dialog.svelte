<script lang="ts">
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
			<Dialog.Title>Settings</Dialog.Title>
			<Dialog.Description>Manage pinner settings.</Dialog.Description>
		</Dialog.Header>

		<div class="flex flex-col items-start gap-5">
			<Label class="flex w-full flex-col items-start gap-2">
				Language

				<LanguageSelect />
			</Label>
		</div>

		<Dialog.Footer>
			<Dialog.Close onclick={onClose}>Close</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
