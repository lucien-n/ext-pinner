<script>
	import { Button } from '&/form';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunIcon from '@lucide/svelte/icons/sun';
	import { toggleMode } from 'mode-watcher';
</script>

<Button onclick={toggleMode} variant="ghost" size="icon-sm">
	<SunIcon class="size-4 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
	<MoonIcon
		class="absolute size-4 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
