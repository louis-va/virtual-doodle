<script lang=ts>
  import { getStroke } from 'perfect-freehand';
  import type { StrokeOptions } from 'perfect-freehand';
  import { getSvgPathFromStroke } from '$lib';
	import { inputStrokes } from "./state.svelte";

  const strokeColor = '#FFFFFF'

  const options: StrokeOptions = {
    size: 6,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  }

  // Create an svg path for each stroke
  const pathsData = $derived.by(() => {
    const data: string[] = [];
    inputStrokes.forEach((inputStroke) => {
      const stroke = getStroke(inputStroke, options);
      const pathData = getSvgPathFromStroke(stroke);
      data.push(pathData);
    })
    return data;
  })
</script>

<svg>
  {#each pathsData as pathData}
    <path d={pathData} fill={strokeColor} stroke={strokeColor} />
  {/each}
</svg>

<style>
  svg {
    touch-action: none;
    width: 100%;
    height: 100%;
  }
</style>