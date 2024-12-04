<script>
  import ServiceGroup from "./ServiceGroup.svelte";
  import { t } from "../../services/TranslationService.js";
  import {
    serviceGroups,
    activeGroup,
    setActiveGroup,
  } from "../../store.js";
  import {onDestroy, onMount} from "svelte";

  function tabsUpDown(event) {
    let direction = 0;
    switch (event.key) {
      case 'ArrowUp':
        direction = -1;
        break;
      case 'ArrowDown':
        direction = 1;
        break;
      default:
    }
    if (direction !== 0) {
      let list = [];
      for (let sgid in $serviceGroups) { list.push(sgid) }
      const currentTab = list.indexOf($activeGroup);
      let newTab = currentTab + direction;
      newTab = (newTab > list.length - 1) ? 0 : newTab;
      newTab = (newTab < 0) ? list.length - 1 : newTab;

      setActiveGroup(list[newTab]);
    }
  }

  onMount(() => {
    window.addEventListener("keydown", tabsUpDown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", tabsUpDown);
  });
</script>

<ul class="cookiesjsr-service-groups" role="tablist" aria-label={t('cookieSettings')}>
  {#each Object.values($serviceGroups) as group (group.id)}
    <ServiceGroup {...group} />
  {/each}
</ul>
