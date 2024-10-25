<script lang=ts>
	import Radar from "./Radar.svelte";
	import Data from "./Data.svelte";
	import Graphs from "./Graphs.svelte";
	import Actions from "./Actions.svelte";
</script>

<section class="container">
	<div class="information">
		<div class="title-bar">
			<div class="title"><span>Information</span></div>
			<div class="tilted-block"></div>
		</div>
		<div class="ui-bg">
			<div class="ui-wrapper">
				<Radar />
				<Graphs />
				<Data />
			</div>
			<div class="lines"></div>
		</div>
	</div>
	<div class="actions">
		<div class="title-bar">
			<div class="tilted-block"></div>
			<div class="tilted-block"></div>
			<div class="title"><span>Actions</span></div>
		</div>
		<div class="ui-bg">
			<div class="ui-wrapper">
				<Actions />
			</div>
			<div class="lines"></div>
		</div>
	</div>
</section>

<style>
	.container {
		position: absolute;
		z-index: 10;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: end;
		justify-content: space-between;
		padding: 4rem;
	}

	/* INFORMATION */
	.information .title-bar {
		display: flex;
		align-items: end;
	}
	.information .title {
		display: flex;
		align-items: center;
		padding: 0 .4rem;
		width: 6rem;
		height: 1rem;
		background-color: rgba(var(--ui-bg), 0.825);
		backdrop-filter: blur(5px);
		clip-path: polygon(0 0, calc(100% - .75rem) 0, 100% 100%, 0 100%);
	} 
	.information .title span {
		line-height: 1;
		font-size: .6rem;
		text-transform: uppercase;
		color: rgb(var(--ui-fg));
	}
	.information .tilted-block {
		width: 1.5rem;
		height: 1rem;
		backdrop-filter: blur(5px);
		background-color: rgba(var(--ui-bg), 0.825);
		clip-path: polygon(0 0, calc(100% - .75rem) 0, 100% 100%, .75rem 100%);
		margin-left: -.5rem;
	}

	.information .ui-bg {
		position: relative;
		width: 15rem;
		height: 5rem;
		padding: .4rem .4rem;
		background-color: rgba(var(--ui-bg), 0.25);
		backdrop-filter: blur(5px);
		border-top: 1px solid rgba(var(--ui-bg), 0.75);
		clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - .75rem), calc(100% - .75rem) 100%, 0% 100%);
	}

	.information .ui-wrapper {
		display: flex;
		gap: .5rem;
		height: 100%;
	}

	.information .lines {
		position: absolute;
		top: .25rem;
		right: .25rem;
		height: calc(100% - .5rem);
		width: 1.25rem;
		clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - .625rem), calc(100% - .625rem) 100%, 0% 100%);
		background: repeating-linear-gradient(
			-45deg,
			rgba(var(--ui-bg), 0.125),
			rgba(var(--ui-bg), 0.125) .125rem,
			rgba(var(--ui-bg), 0) .125rem,
			rgba(var(--ui-bg), 0) .25rem
		);
	}

	/* ACTIONS */
	.actions {
		display: flex;
		flex-direction: column;
		align-items: end;
	}
	.actions .title-bar {
		display: flex;
		align-items: end;
	}
	.actions .title {
		display: flex;
		align-items: center;
		justify-content: end;
		padding: 0 .4rem;
		width: 6rem;
		height: 1rem;
		background-color: rgba(var(--ui-bg), 0.825);
		backdrop-filter: blur(5px);
		clip-path: polygon(.75rem 0, 100% 0, 100% 100%, 0 100%);
	} 
	.actions .title span {
		line-height: 1;
		font-size: .6rem;
		text-transform: uppercase;
		color: rgb(var(--ui-fg));
	}
	.actions .tilted-block {
		width: 1.5rem;
		height: 1rem;
		backdrop-filter: blur(5px);
		background-color: rgba(var(--ui-bg), 0.825);
		clip-path: polygon(.75rem 0, 100% 0, calc(100% - .75rem) 100%, 0 100%);
		margin-right: -.5rem;
	}

	.actions .ui-bg {
		position: relative;
		width: 13rem;
		height: 5rem;
		padding: .4rem .4rem;
		background-color: rgba(var(--ui-bg), 0.25);
		backdrop-filter: blur(5px);
		border-top: 1px solid rgba(var(--ui-bg), 0.75);
		clip-path: polygon(0% 0%, 100% 0%, 100% 100%, .75rem 100%, 0% calc(100% - .75rem));
	}

	.actions .ui-wrapper {
		display: flex;
		justify-content: end;
		gap: .5rem;
		height: 100%;
	}

	.actions .lines {
		position: absolute;
		top: .25rem;
		left: .25rem;
		height: calc(100% - .5rem);
		width: 1.25rem;
		clip-path: polygon(0% 0%, 100% 0%, 100% 100%, .625rem 100%, 0% calc(100% - .625rem));
		background: repeating-linear-gradient(
			45deg,
			rgba(var(--ui-bg), 0.125),
			rgba(var(--ui-bg), 0.125) .125rem,
			rgba(var(--ui-bg), 0) .125rem,
			rgba(var(--ui-bg), 0) .25rem
		);
	}
</style>
