<div class="bg">
	<div />
</div>

<style>
	.bg {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		background-color: #3f4245;
	}

	.bg > div {
		position: absolute;
		width: 100%;
		height: 100%;
		background: radial-gradient(
				circle farthest-side at 0% 100%,
				rgb(47, 47, 47) 0%,
				rgba(47, 47, 47, 0) 100%
			),
			radial-gradient(
				circle farthest-side at 100% 100%,
				rgb(63, 63, 63) 0%,
				rgba(63, 63, 63, 0) 100%
			),
			radial-gradient(circle farthest-side at 100% 0%, rgb(76, 76, 76) 0%, rgba(76, 76, 76, 0) 100%),
			radial-gradient(circle farthest-side at 0% 0%, rgb(58, 58, 58) 0%, rgba(58, 58, 58, 0) 100%),
			black;
	}
</style>
