<script lang=ts>
	import { onMount } from 'svelte';
	import { Camera } from "./Camera";
	import { HandDetector } from './HandDetector';

	let video: HTMLVideoElement;
	let webcam: Camera;
	let detector: HandDetector;

	onMount(() => {
		webcam = new Camera(video!);
		webcam.init().catch((error) => {
			console.error('Failed to initialize webcam:', error);
		});

		detector = new HandDetector();
		detector.init().catch((error) => {
			console.error('Failed to initialize detector:', error);
		});
	})
</script>

<svelte:head>
	<title>Psychic Doodle</title>
	<meta name="description" content="Psychic Doodle Game" />
</svelte:head>

<section class="container">
	<div id="canvas">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video bind:this={video} id="webcam" playsinline></video>
	</div>
</section>

<style>
	.container {
		display: flex;
		width: 100vw;
		height: 100vh;
		align-items: center;
		justify-content: center;
	}
	#canvas {
		width: 100vmin;
  	height: 100vmin;
	}
	#webcam {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
	}
</style>
