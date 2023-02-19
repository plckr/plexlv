<script>
	import { page } from '$app/stores';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<pre>
{JSON.stringify($page.data.data, null, 2)}
</pre>

<style>
	pre {
		max-width: 100%;
		white-space: pre-wrap;
	}
</style>
