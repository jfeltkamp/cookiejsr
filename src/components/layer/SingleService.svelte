<script>
  import TheSwitch from "../ui/TheSwitch.svelte";
  import BaseLinks from "../ui/BaseLinks.svelte";
  import { t } from "../../services/TranslationService.js";
  import {cookieDocs, services, setService} from "../../store.js";

  export let service = {};

  function computeLinks() {
    const links = [];
    if (typeof service.uri !== "undefined" && service.uri)
      links.push({href: service.uri, title: t('officialWebsite')});
    if (service.cookieDocs)
      links.push({ href: t('cookieDocsUri') + "#" + service.key, title: t('cookieDocs'), attributes: {} });
    return links;
  }
  $: links = computeLinks();

  function setConsent(checked) {
    setService(service.key, checked)
  }
</script>

<li class="cookiesjsr-service">
  <div class="cookiesjsr-service--description">
    <h3>{ service.name }</h3>
    <BaseLinks links={links} class="cookiesjsr-service--links" direction="row"/>
  </div>
  <div class="cookiesjsr-service--action">
    {#if service.needConsent}
      <TheSwitch
        title={$services[service.key] ? t('allowed') : t('denied')}
        activated={$services[service.key]}
        changed={setConsent} />
    {:else}
      <div class="cookiesjsr-service--always-on">
        <span>{t('alwaysActive')}</span>
      </div>
    {/if}
  </div>
</li>

