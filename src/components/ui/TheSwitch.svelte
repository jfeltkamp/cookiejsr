<script>
  export let activated = true;
  export let title = '';
  export let changed = () => {};

  function handleChange(event) {
    changed(event.target.checked)
  }
</script>

<label class="cookiesjsr-switch { activated ? 'active' : '' }" title="{title}">
  <input type="checkbox" on:change={handleChange} bind:checked={activated} />
</label>
