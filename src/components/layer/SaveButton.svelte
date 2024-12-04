<script>
  import BaseButton from '../ui/BaseButton.svelte';
  import StoreCookieService from "../../services/StoreCookieService.js";
  import {closeBanner, closeLayer, services, setAllServices} from "../../store.js";

  function saveAndClose() {
    const s = {...$services};
    StoreCookieService.setServices(s);
    setAllServices(s);
    closeBanner();
    closeLayer();
  }
</script>

<BaseButton btnType="invert important save dialog-last-tab" clicked={saveAndClose}>
  <slot/>
</BaseButton>
