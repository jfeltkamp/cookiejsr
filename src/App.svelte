<script>
  import TheBanner from "./components/TheBanner.svelte";
  import TheLayer from "./components/TheLayer.svelte";
  import { bannerVisible, layerOpen, openSettingsHash, openLayer } from "./store.js";

  function hashChangeHandler() {
    if (window.location.hash === $openSettingsHash) {
      openLayer();
    }
  }
  hashChangeHandler();

  // Behavior Layer open: Listen to hash changes not initialized by link click.
  window.addEventListener("hashchange", () => { hashChangeHandler() }, false);

  // Behavior Layer open: Listen to clicks on opener link click (avoid to change the location.hash).
  const selector = 'a[href="%hash"]'.replace('%hash', $openSettingsHash);
  const openLinks = document.querySelectorAll(selector);
  for (let link of openLinks) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      openLayer();
    });
  }
</script>

<div class="cookiesjsr--app">
  {#if $bannerVisible}
    <TheBanner />
  {/if}
  {#if $layerOpen}
    <TheLayer />
  {/if}
</div>

