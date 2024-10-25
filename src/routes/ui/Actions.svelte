<script lang=ts>
	import { undoLastStroke, deleteStrokes } from '../state.svelte';
</script>

<button class="undo" onclick={() => undoLastStroke()}>
  Undo
</button>
<button class="delete" onclick={() => deleteStrokes()}>
  Delete
</button>