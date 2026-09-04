<script lang="ts">
	import { getLocale, locales, setLocale } from '$lib/paraglide/runtime';
	import * as Select from '&/select';

	interface Props {
		id: string;
	}

	const { id }: Props = $props();

	const LOCALE_TO_NAME_MAPPING: Record<string, string> = {
		en: 'English',
		fr: 'Français'
	};

	let current = $state(getLocale());
</script>

<Select.Root
	type="single"
	bind:value={current}
	onValueChange={(v) => setLocale(v as typeof current, { reload: true })}
>
	<Select.Trigger class="w-full" {id}>
		{LOCALE_TO_NAME_MAPPING[current]}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each locales as locale (locale)}
				<Select.Item value={locale}>{LOCALE_TO_NAME_MAPPING[locale]}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
