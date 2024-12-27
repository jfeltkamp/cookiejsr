<script>
  import TheBanner from "./components/TheBanner.svelte";
  import TheLayer from "./components/TheLayer.svelte";
  import debounce from "./services/debounce.js";
  import { isUpdateRequired, scrollLimit, bannerVisible,  layerOpen, openSettingsHash, openBanner, openLayer } from "./store.js";

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

  // Scroll behavior (Banner opens not immediately but after scroll limit is reached.)
  if ( $isUpdateRequired ) {
    const scrollHeight = Math.min($scrollLimit, (document.documentElement.scrollHeight - document.documentElement.clientHeight));
    if ( scrollHeight <= 0 ) {
      openBanner();
    } else {
      let load = debounce(() => {
        if (document.body.scrollTop >= scrollHeight || document.documentElement.scrollTop >= scrollHeight) {
          openBanner();
          window.removeEventListener('scroll', load);
        }
      }, 100)
      window.addEventListener('scroll', load);
    }
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

