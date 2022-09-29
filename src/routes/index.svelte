<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { Application } from '$lib/Application';
	import * as LogRocket from 'logrocket';

	let canvas: HTMLCanvasElement;
	let App: Application;

	onMount(async () => {
		App = new Application(canvas);
		LogRocket.init('ievmwn/foreverio');
	});
</script>

<svelte:head>
	<title>|| Forever IO ||</title>
	<meta name="description" content="Forever IO Browser Game" />
</svelte:head>

<div class="cursor rounded" />
<canvas class="webgl" bind:this={canvas} />