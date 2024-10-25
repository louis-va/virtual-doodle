<script>
  import '../app.css';
</script>

<main>
  <slot />
</main>

<style global>
  :root {
    --bg: 23, 22, 23;
    --ui-bg: 254, 255, 237;
    --ui-fg: 23, 22, 23;

    --success: 0, 255, 132;
    --error: 255, 0, 76;
    --warning: 255, 174, 0;

    --easeOutCubic: cubic-bezier(0.33, 1, 0.68, 1);
  }
</style>