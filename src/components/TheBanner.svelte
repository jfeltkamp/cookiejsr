<script>
  import BaseButton from "./ui/BaseButton.svelte";
  import BaseLinks from "./ui/BaseLinks.svelte";
  import SetAllServices from "./ui/SetAllServices.svelte";
  import { t } from "../services/TranslationService.js";
  import {bannerVisible, cookieDocs, settingsAsLink, openSettingsHash, showDenyAll, openLayer} from "../store.js";
  import { getLink } from "../services/helper.js";

  function computeLinks() {
    const links = [];
    const privacyLink = getLink(t('privacyUri'), t('privacyPolicy'))
    if (privacyLink) { links.push(privacyLink) }

    const imprintLink = getLink(t('imprintUri'), t('imprint'))
    if (imprintLink) { links.push(imprintLink) }

    const cookieDocsLink = getLink(t('cookieDocsUri'), t('cookieDocs'))
    if ($cookieDocs && cookieDocsLink) { links.push(cookieDocsLink) }

    if ($settingsAsLink) {
      links.push({href: $openSettingsHash, title: t('settings'), clicked: () =>  openLayer() });
    }
    return links
  }

  const links = computeLinks();
</script>

<div class="cookiesjsr-banner { $bannerVisible ? 'cookiesjsr-banner--active' : ''}">
  <div class="cookiesjsr-banner__info">
    {@html t('bannerText')}
  </div>

  <div class="cookiesjsr-banner__action">
    {#if !$settingsAsLink}
      <BaseButton btnType="cookiesjsr-settings" clicked={() => openLayer()}>{t('settings')}</BaseButton>
    {/if}
    {#if $showDenyAll}
      <SetAllServices btnType="important denyAll" setAll={false}>{t('denyAll')}</SetAllServices>
    {/if}
    <SetAllServices btnType="important allowAll" setAll={true}>{t('acceptAll')}</SetAllServices>
  </div>

  <BaseLinks links={links} classes="cookiesjsr-banner__links" direction="row"/>
</div>
