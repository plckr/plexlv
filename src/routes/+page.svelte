<script>
	import { page } from '$app/stores';
	import MediaCard from '$components/ui/media-card.svelte';
</script>

<MediaCard title="007 - Alvo em Movimento" subtitle="1985" href="/" />

<pre>
{JSON.stringify($page.data.data, null, 2)}
</pre>

<style>
	pre {
		max-width: 100%;
		white-space: pre-wrap;
	}
</style>
