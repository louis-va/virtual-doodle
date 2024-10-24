<script lang=ts>
</script>

<div class="radar">
  <div class="angle top-left"></div>
  <div class="angle top-right"></div>
  <div class="angle bottom-left"></div>
  <div class="angle bottom-right"></div>
</div>

<style>
	.radar {
		position: relative;
		height: 100%;
		aspect-ratio: 1;
		background-size: .25rem .25rem;
  	background-image: radial-gradient(circle, rgba(var(--ui-bg), 0.25) 1px, rgba(0, 0, 0, 0) 1px);
		background-position: center;
	}
	.radar .angle {
		position: absolute;
		width: .5rem;
		height: .5rem;
		--border-color: rgba(var(--ui-bg), 0.75);
	}
	.radar .angle.top-left {
		top: 0;
		left: 0;
		border-top: 1px solid var(--border-color);
		border-left: 1px solid var(--border-color);
	}
	.radar .angle.top-right {
		top: 0;
		right: 0;
		border-top: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
	}
	.radar .angle.bottom-left {
		bottom: 0;
		left: 0;
		border-bottom: 1px solid var(--border-color);
		border-left: 1px solid var(--border-color);
	}
	.radar .angle.bottom-right {
		bottom: 0;
		right: 0;
		border-bottom: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
	}
</style>
