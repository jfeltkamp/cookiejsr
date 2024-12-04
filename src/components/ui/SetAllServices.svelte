<script>
  import StoreCookieService from '../../services/StoreCookieService.js';
  import BaseButton from './BaseButton.svelte'
  import {services, setAllServices, closeBanner, closeLayer} from "../../store.js";

  export let btnType = '';
  export let setAll = false;

  function setAllSaveAndClose() {
    let servicesState = {...$services};
    for (let id in servicesState) {
      if (typeof servicesState[id] !== 'undefined') {
        servicesState[id] = setAll;
      }
    }
    StoreCookieService.setServices(servicesState);
    setAllServices(servicesState);
    closeBanner();
    closeLayer();
  }
</script>

<BaseButton
    clicked="{setAllSaveAndClose}"
    btnType="{btnType}">
  <slot/>
</BaseButton>