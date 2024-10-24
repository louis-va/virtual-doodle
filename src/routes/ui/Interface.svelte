<script lang=ts>
	import Radar from "./Radar.svelte";
	import Data from "./Data.svelte";
</script>

<section class="container">
  <div class="wrapper">
		<div class="title-bar">
			<div class="title"><span>Information</span></div>
			<div class="tilted-block"></div>
			<div class="tilted-block"></div>
		</div>
		<div class="ui">
			<div class="info">
				<Radar />
				<Data />
			</div>
		</div>
  </div>
</section>

<style>
	.container {
		position: absolute;
		z-index: 10;
		width: 100%;
		height: 100%;
	}
	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: end;
		padding: 3rem 3rem;
	}

	.title-bar {
		display: flex;
		align-items: end;
	}
	.title {
		display: flex;
		align-items: center;
		padding: 0 .4rem;
		width: 6rem;
		height: 1rem;
		background-color: rgba(var(--ui-bg), 0.825);
		backdrop-filter: blur(5px);
		clip-path: polygon(0 0, calc(100% - .75rem) 0, 100% 100%, 0 100%);
	} 
	.title span {
		line-height: 1;
		font-size: .6rem;
		text-transform: uppercase;
		color: rgb(var(--ui-fg));
	}
	.tilted-block {
		width: 1.5rem;
		height: 1rem;
		backdrop-filter: blur(5px);
		background-color: rgba(var(--ui-bg), 0.875);
		clip-path: polygon(0 0, calc(100% - .75rem) 0, 100% 100%, .75rem 100%);
		margin-left: -.625rem;
	}

	.ui {
		width: 20rem;
		height: 5rem;
		padding: .4rem .4rem;
		background-color: rgba(var(--ui-bg), 0.25);
		backdrop-filter: blur(5px);
		border-top: 1px solid rgba(var(--ui-bg), 0.75);
	}

	.ui .info {
		display: flex;
		gap: .5rem;
		height: 100%;
	}
</style>
