<script>
  import BaseButton from "./ui/BaseButton.svelte";
  import BaseLinks from "./ui/BaseLinks.svelte";
  import SetAllServices from "./ui/SetAllServices.svelte";
  import { t } from "../services/TranslationService.js";
  import {bannerVisible, cookieDocs, settingsAsLink, openSettingsHash, showDenyAll, openLayer} from "../store.js";

  function computeLinks() {
    const links = [
      {href: t('privacyUri'), title: t('privacyPolicy'), attributes: {target: '_blank'}},
      {href: t('imprintUri'), title: t('imprint'), attributes: {target: '_blank'}}
    ];
    if ($cookieDocs) {
      links.push({
        href: t('cookieDocsUri'),
        title: t('cookieDocs'),
        attributes: {target: '_blank'},
      });
    }
    if ($settingsAsLink) {
      links.push({
        href: $openSettingsHash,
        title: t('settings'),
        clicked: () => {
          openLayer();
        }
      });
    }
    return links
  }

  $: links = computeLinks();
</script>

<div class="cookiesjsr-banner { $bannerVisible ? 'active' : ''}">
  <div class="cookiesjsr-banner--info">
    <span class="cookiesjsr-banner--text">{t('bannerText')}</span>
    <BaseLinks links={links} classes="cookiesjsr-banner--links" direction="row"/>
  </div>

  <div class="cookiesjsr-banner--action">
    {#if !$settingsAsLink}
      <BaseButton btnType="cookiesjsr-settings" clicked={() => openLayer()}>{t('settings')}</BaseButton>
    {/if}
    {#if $showDenyAll}
      <SetAllServices btnType="important denyAll" setAll={false}>{t('denyAll')}</SetAllServices>
    {/if}
    <SetAllServices btnType="important allowAll" setAll={true}>{t('acceptAll')}</SetAllServices>
  </div>
</div>
