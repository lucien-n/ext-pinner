<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { Button } from '&/button';
	import * as Dialog from '&/dialog';
	import { Label } from '&/label';
	import ImportCollectionsInput from './import-collections-input.svelte';
	import LanguageSelect from './language-select.svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	const { isOpen, onClose }: Props = $props();

	const exportSupportedExtensions: { label: string; extensionUrl: string }[] = [
		{
			label: 'Pinner',
			extensionUrl:
				'https://chromewebstore.google.com/detail/pinner-persisted-pinned-t/aabmkfbjcdbcjdjkdjjdpminiffikhpc'
		},
		{
			label: 'Save Pinned Tabs',
			extensionUrl:
				'https://chromewebstore.google.com/detail/save-pinned-tabs/anmidgajdonkgmmilbccfefkfieajakd'
		}
	];
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

			<Label class="flex w-full flex-col items-start gap-2">
				<div class="flex flex-col gap-1">
					{m.away_teary_capybara_surge()}
					<span class="text-xs text-muted-foreground">
						{m.real_zany_toucan_flow()}

						{#each exportSupportedExtensions as ext, idx (ext.extensionUrl)}
							{#if idx < exportSupportedExtensions.length - 1 && idx > 0}
								,
							{:else if idx === exportSupportedExtensions.length - 1}
								&nbsp;&
							{/if}

							<Button
								variant="link"
								class="h-5 p-0 text-xs text-inherit"
								href={ext.extensionUrl}
								target="_blank"
							>
								{ext.label}
							</Button>
						{/each}
					</span>
				</div>

				<ImportCollectionsInput />
			</Label>
		</div>

		<Dialog.Footer>
			<Dialog.Close onclick={onClose}>{m.giant_kind_jay_nail()}</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
