<script lang="ts">
	import { usePinner } from '$lib/hooks/usePinner.svelte';
	import icons from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { Button } from '&/button';
	import * as Select from '&/select';
	import { parsePinnerDataToJSON } from './export/helpers';
	import { PARSER_TYPE_SPECS } from './export/specs';
	import { ParserType } from './export/types';

	interface Props {
		id: string;
	}

	const { id }: Props = $props();

	const pinner = usePinner();

	let linkEl = $state<HTMLAnchorElement | null>(null);

	let selectedParserType = $state<ParserType>(ParserType.Pinner);

	function handleDownload() {
		if (!linkEl) return;

		const data = parsePinnerDataToJSON(selectedParserType, pinner);
		const dataStr = `data:text/json;charset-utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;

		const today = new Date();
		const formattedDate = today.toISOString().split('T')[0];
		linkEl.download = `pinner-export_${formattedDate}_${PARSER_TYPE_SPECS[selectedParserType].label.toLowerCase().replaceAll(' ', '-')}.json`;
		linkEl.href = dataStr;

		linkEl.click();
		linkEl.href = '#';
	}
</script>

<!-- svelte-ignore a11y_invalid_attribute -->
<a
	bind:this={linkEl}
	href="#"
	aria-label="Hidden input used for export download"
	class="hidden"
></a>

<div class="flex w-full gap-1">
	<Select.Root type="single" bind:value={selectedParserType}>
		<Select.Trigger class="w-full" {id}>
			{PARSER_TYPE_SPECS[selectedParserType].label}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each Object.values(PARSER_TYPE_SPECS) as opt (opt.value)}
					<Select.Item value={opt.value}>
						{opt.label}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>

	<Button onclick={handleDownload}>
		<icons.global.download />
		{m.fair_last_marmot_surge()}
	</Button>
</div>
