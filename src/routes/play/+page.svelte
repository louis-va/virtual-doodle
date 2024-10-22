<script lang=ts>
	import { onMount } from 'svelte';
	import { Renderer } from './Renderer';

	let video: HTMLVideoElement;
	let canvas: HTMLElement;
	let renderer: Renderer;

	onMount(async () => {
		renderer = new Renderer(canvas, video);
		await renderer.init();
		renderer.start();
	})
</script>

<svelte:head>
	<title>Psychic Doodle</title>
	<meta name="description" content="Psychic Doodle Game" />
</svelte:head>

<div bind:this={canvas} id="canvas"></div>

<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={video} id="webcam" aria-hidden></video>

<style>
	#canvas {
		width: 100%;
  	height: auto;
	}
	#webcam {
		display: none;
	}
</style>
