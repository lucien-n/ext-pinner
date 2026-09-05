<script lang="ts">
	import icons from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { Button } from '&/button';
	import * as Dialog from '&/dialog';
	import { Label } from '&/label';
	import { ScrollArea } from '&/scroll-area';
	import ExportCollectionsAction from './export-collections-action.svelte';
	import { PARSER_TYPE_SPECS } from './export/specs';
	import ImportCollectionsAction from './import-collections-action.svelte';
	import LanguageSelect from './language-select.svelte';
	import { APP_NAME } from '$lib/constants';

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
	<Dialog.Content class="h-[90vh] max-h-[90vh]">
		<Dialog.Header>
			<Dialog.Title>{m.noble_east_crab_play()}</Dialog.Title>
			<Dialog.Description>{m.plain_due_rat_enchant({ APP_NAME })}</Dialog.Description>
		</Dialog.Header>

		<ScrollArea class="min-h-0 flex-1">
			<div class="flex flex-col items-start gap-5 pr-4">
				<section class="flex w-full flex-col items-start gap-1">
					<Label for="language-select">
						{m.top_trite_shad_chop()}
					</Label>

					<LanguageSelect id="language-select" />
				</section>

				<section class="flex w-full flex-col items-start gap-1">
					<Label for="import-collections-action">
						{m.away_teary_capybara_surge()}
					</Label>

					<p class="text-xs text-muted-foreground">
						{m.real_zany_toucan_flow()}

						{#each Object.values(PARSER_TYPE_SPECS) as opt, idx (opt.extensionUrl)}
							{#if idx < Object.values(PARSER_TYPE_SPECS).length - 1 && idx > 0}
								,
							{:else if idx === Object.values(PARSER_TYPE_SPECS).length - 1}
								&nbsp;&
							{/if}

							<Button
								variant="link"
								class="h-5 gap-0.5 p-0 text-xs text-inherit"
								href={opt.extensionUrl}
								target="_blank"
							>
								{opt.label}

								<icons.global.externallink class="size-2" />
							</Button>
						{/each}
					</p>

					<ImportCollectionsAction id="import-collections-action" />
				</section>

				<section class="flex w-full flex-col items-start gap-1">
					<Label for="export-collections-action">
						{m.trite_spry_cowfish_pull()}
					</Label>

					<p class="text-xs text-muted-foreground">{m.male_zippy_kudu_enrich()}</p>

					<ExportCollectionsAction id="export-collections-action" />
				</section>
			</div>
		</ScrollArea>

		<Dialog.Footer>
			<Dialog.Close onclick={onClose}>{m.giant_kind_jay_nail()}</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
