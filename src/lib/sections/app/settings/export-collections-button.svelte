<script lang="ts">
	import { usePinner } from '$lib/hooks/usePinner.svelte';
	import icons from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { Button } from '&/button';
	import { parsePinnerDataToJSON } from './export/helpers';
	import { ParserType } from './export/types';

	const pinner = usePinner();

	let linkEl = $state<HTMLAnchorElement | null>(null);

	function handleDownload() {
		if (!linkEl) return;

		// todo: parser type select to allow exporting to different extensions
		const data = parsePinnerDataToJSON(ParserType.Pinner, pinner);
		const dataStr = `data:text/json;charset-utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;

		const today = new Date();
		const formattedDate = today.toISOString().split('T')[0];
		linkEl.download = `pinner-export_${formattedDate}.json`;
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

<Button class="w-full" onclick={handleDownload}>
	<icons.global.download />
	{m.fair_last_marmot_surge()}
</Button>
