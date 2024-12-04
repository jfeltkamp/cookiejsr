<script>
  export let classes = '';
  export let links = [];
  export let direction = '';
</script>

<ul class="cookiesjsr-links {classes} {direction === 'row' ? 'links--row' : ''}">
  {#each links as link, index}
    <li>
      <a
        href="{link.href}"
        {...link.attributes}
        on:click={typeof link.clicked === 'function' ? link.clicked : () => {}}
      >
        { link.title }
      </a>
    </li>
  {/each}
</ul>