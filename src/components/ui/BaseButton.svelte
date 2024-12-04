<script>
  export let disabled = false;
  export let btnType = '';
  export let clicked = () => {};
</script>

<button {disabled} class="cookiesjsr-btn {btnType}" on:click={clicked}>
    <slot />
</button>


