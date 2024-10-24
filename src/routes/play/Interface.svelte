<script lang=ts>
	import Radar from "./radar.svelte";
</script>

<section class="container">
  <div class="wrapper">
		<div class="title-bar">
			<div class="title"><span>Interface</span></div>
			<div class="tilted-block"></div>
			<div class="tilted-block"></div>
		</div>
		<div class="ui">
			<div class="info">
				<Radar />
			</div>
		</div>
  </div>
</section>

<style>
	.container {
		position: absolute;
		z-index: 10;
		width: 100%;
		max-width: 900px;
		height: 100%;
	}
	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: end;
		padding: 3rem 1rem;
	}

	.title-bar {
		display: flex;
	}
	.title {
		display: flex;
		align-items: center;
		padding: 0 .4rem;
		width: 10rem;
		height: 1.25rem;
		background-color: rgba(var(--ui-bg), 0.825);
		backdrop-filter: blur(5px);
		clip-path: polygon(0 0, calc(100% - .75rem) 0, 100% 100%, 0 100%);
	} 
	.title span {
		line-height: 1;
		font-size: .75rem;
		text-transform: uppercase;
		color: rgb(var(--ui-fg));
	}
	.tilted-block {
		width: 1.5rem;
		height: 1.25rem;
		backdrop-filter: blur(5px);
		background-color: rgba(var(--ui-bg), 0.875);
		clip-path: polygon(0 0, calc(100% - .75rem) 0, 100% 100%, .75rem 100%);
		margin-left: -.5rem;
	}

	.ui {
		width: 100%;
		height: 5rem;
		padding: .4rem .4rem;
		background-color: rgba(var(--ui-bg), 0.25);
		backdrop-filter: blur(5px);
		border-top: 1px solid rgba(var(--ui-bg), 0.75);
	}

	.ui .info {
		display: flex;
		height: 100%;
	}
</style>
