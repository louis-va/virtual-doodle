<script lang=ts>
	import { onMount } from 'svelte';
	import { Camera } from "./Camera";

	let videoElement: HTMLVideoElement;
	let webcam: Camera;

	onMount(() => {
		webcam = new Camera(videoElement!);
		webcam.init().then(() => {
				console.log('Webcam initialized');
		}).catch((error) => {
				console.error('Failed to initialize webcam:', error);
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
		<video bind:this={videoElement} id="webcam" height="500" width="500"></video>
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
	}
</style>
