<script>
  import GroupConsent from "./GroupConsent.svelte";
  import SingleService from "./SingleService.svelte";
  import { t } from "../../services/TranslationService.js";
  import { groupConsent, activeGroup, setActiveGroup } from "../../store.js";

  export let id = '';
  export let services = [];
</script>

<li class="cookiesjsr-service-group { id === $activeGroup ? 'cookiesjsr-service-group--active' : '' }">
  <button class="cookiesjsr-service-group__tab" role="tab"
    id="tab-{ id }"
    aria-selected="{id === $activeGroup ? 'true' : 'false'}"
    tabIndex="{id === $activeGroup ? '0' : '-1' }"
    aria-controls="panel-{ id }"
    on:click={ () => setActiveGroup(id) }
  >
    { t(id + '.title') }
  </button>
  <div class="cookiesjsr-service-group__content"
       id="panel-{ id }"
       role="tabpanel"
       aria-labelledby="tab-{ id }"
       hidden="{ id !== $activeGroup }">
    <div class="cookiesjsr-service-group__intro">
      {@html t(id + '.details') }
    </div>
    <ul class="cookiesjsr-service-group__services">
      {#if $groupConsent}
        <GroupConsent gid={id} title={id + '.title'} />
      {:else}
        {#each services as service (service.key)}
          <SingleService service={service} />
        {/each}
      {/if}
    </ul>
  </div>
</li>
