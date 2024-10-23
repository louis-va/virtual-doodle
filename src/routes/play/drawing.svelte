<script lang=ts>
  import { getStroke } from 'perfect-freehand';
  import type { StrokeOptions } from 'perfect-freehand';
  import { getSvgPathFromStroke } from '$lib';
	import { inputPoints } from "./state.svelte";

  const options: StrokeOptions = {
    size: 12,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  }

  const stroke = $derived(getStroke(inputPoints, options));
  const pathData = $derived(getSvgPathFromStroke(stroke));
</script>

<svg>
  <path d={pathData} fill="white" stroke="white" />
</svg>

<style>
  svg {
    touch-action: none;
    width: 100%;
    height: 100%;
  }
</style>