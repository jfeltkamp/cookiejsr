<script>
  import TheSwitch from "../ui/TheSwitch.svelte";
  import BaseLinks from "../ui/BaseLinks.svelte";
  import { t } from "../../services/TranslationService.js";
  import {cookieDocs, services, setService} from "../../store.js";
  import {getLink} from "../../services/helper.js";

  export let service = {};

  function computeLinks() {
    const links = [];
    if (typeof service.uri !== "undefined" && service.uri) {
      links.push({href: service.uri, title: t('officialWebsite')});
    }
    if (service.cookieDocs) {
      const cookieDocsLink = getLink(t('cookieDocsUri') + '#' + service.key, t('cookieDocs'))
      if (cookieDocsLink) { links.push(cookieDocsLink); }
    }
    return links;
  }
  $: links = computeLinks();

  function setConsent(checked) {
    setService(service.key, checked)
  }
</script>

<li class="cookiesjsr-service">
  <div class="cookiesjsr-service__description">
    <h3>{ service.name }</h3>
    <BaseLinks links={links} class="cookiesjsr-service__links" direction="row"/>
  </div>
  <div class="cookiesjsr-service__action">
    {#if service.needConsent}
      <TheSwitch
        title={$services[service.key] ? t('allowed') : t('denied')}
        activated={$services[service.key]}
        changed={setConsent} />
    {:else}
      <div class="cookiesjsr-service__always-on">
        <span>{t('alwaysActive')}</span>
      </div>
    {/if}
  </div>
</li>

