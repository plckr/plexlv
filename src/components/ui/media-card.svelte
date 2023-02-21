<script lang="ts">
	let className = '';
	export { className as class };
	export let title: string;
	export let subtitle: string;
	export let href: string;
	export let description: string | undefined = undefined;
</script>

<article class="media-card {className}">
	<div class="card">
		<a {href} {title}>
			<img src="https://i.imgur.com/Slm02LL.png" />
		</a>
	</div>
	<div class="info">
		<a class="title" {href} {title}>
			{title}
		</a>
		<p class="subtitle">
			{subtitle}
		</p>
		{#if description}
			<p class="description">
				{description}
			</p>
		{/if}
	</div>
</article>

<style lang="postcss">
	.card {
		margin-bottom: 8px;
		background-color: rgba(0, 0, 0, 0.45);
		border-radius: 4px;
		box-shadow: 0 0 4px rgb(0 0 0 / 30%);
		position: relative;

		overflow: hidden;
		aspect-ratio: 1 / 1.5;
		max-width: 200px;

		& img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		@media --hover {
			&:hover {
				border-radius: 4px;
				box-shadow: 0 0 0 1px #e5a00d, 0 0 4px rgb(0 0 0 / 30%);

				& + .info .title {
					text-decoration: underline;
				}

				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(30, 30, 30, 0.6);
					pointer-events: none;
					user-select: none;
				}
			}
		}
	}

	.info {
		padding-inline: 4px;
		cursor: default;

		& > * {
			display: block;

			line-height: 24px;
			text-overflow: ellipsis;
			white-space: nowrap;

			overflow: hidden;
		}
	}

	.title {
		color: #fff;

		@media --hover {
			&:hover {
				text-decoration: underline;
			}
		}
	}

	.subtitle {
		color: hsla(0, 0%, 100%, 0.45);
	}
</style>
