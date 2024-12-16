<script>
  import BaseLinks from "../ui/BaseLinks.svelte";
  import TheSwitch from "../ui/TheSwitch.svelte";
  import { t } from "../../services/TranslationService.js";
  import {services, cookieDocs, serviceGroups, setMultipleServices} from "../../store.js";
  import {getLink} from "../../services/helper.js";

  export let gid = '';
  export let title = '';

  function setConsent(value) {
    const services = {};
    for (let serviceDefinition of groupServices) {
      if (serviceDefinition['needConsent']) {
        services[serviceDefinition['key']] = value;
      }
    }
    setMultipleServices(services);
  }

  // 'Computed/reactive' local state
  $: header = gid === 'default' ? 'requiredCookies' : title;

  const cookieDocsLink = getLink(t('cookieDocsUri') + '#' + gid, t('cookieDocs'))
  $: links = ($cookieDocs && cookieDocsLink) ? [cookieDocsLink] : [];
  $: groupServices = (
          typeof $serviceGroups[gid] === 'object' &&
          typeof $serviceGroups[gid]['services'] === 'object'
  ) ? $serviceGroups[gid]['services'] : [];
  $: groupNeedConsent = groupServices
          .filter(service => service['needConsent'])
          .length > 0;
  $: groupIsEnabled = groupServices
          .filter(service => $services[service['key']])
          .length > 0;
</script>

<li class="cookiesjsr-service group-{gid}">
  <div class="cookiesjsr-service--description">
    <h3>{ t(header) }</h3>
    <BaseLinks links={links} class="cookiesjsr-service--links" direction="row"/>
  </div>
  <div class="cookiesjsr-service--action">
    {#if groupNeedConsent}
      <TheSwitch
        title={$services[gid] ? t('allowed') : t('denied') }
        activated={groupIsEnabled}
        changed={setConsent} />
    {:else}
      <div class="cookiesjsr-service--always-on">
        <span>{t('alwaysActive')}</span>
      </div>
    {/if}
  </div>
</li>