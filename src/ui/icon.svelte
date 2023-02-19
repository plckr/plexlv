<script lang="ts" context="module">
	import home from './icons/home.svg?raw';
	import discover from './icons/discover.svg?raw';
	import movie from './icons/movie.svg?raw';
	import music from './icons/music.svg?raw';
	import photo from './icons/photo.svg?raw';
	import tv from './icons/tv.svg?raw';
	import tvshow from './icons/tvshow.svg?raw';

	export const icons = {
		home,
		discover,
		movie,
		music,
		photo,
		tv,
		tvshow
	};

	export type IconOptions = keyof typeof icons;

	export const isIconVariant = (variant: string | undefined): variant is IconOptions => {
		if (!variant) return false;
		return Object.keys(icons).includes(variant);
	};
</script>

<script lang="ts">
	let className: string | undefined = undefined;
	export { className as class };

	export let icon: IconOptions;
</script>

<i data-icon={icon} class={className} aria-hidden="true" {...$$restProps}>
	{@html icons[icon]}
</i>
