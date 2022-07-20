<div>
	<svg
		width="100"
		height="100"
		viewBox="0 0 100 100"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="o-path"
	>
		<circle cx="50" cy="50" r="32.5" stroke="#A9C9C9" stroke-width="10" />
	</svg>
</div>

<style>
	.o-path {
		padding-top: 12px;
		stroke-dasharray: 205;
		stroke-dashoffset: -205;
		animation: dash 0.4s ease-in forwards;
		animation-delay: 0.75s;
	}

	@keyframes dash {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
