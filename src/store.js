import { writable } from 'svelte/store';
import conf from "./services/ConfigService";
import scs from "./services/StoreCookieService";

const groups = conf.getServiceGroups();
const active = Object.keys(groups).length ? Object.keys(groups).shift(): '';
// State
export const bannerVisible = writable(scs.isUpdateRequired());
export const cookieDocs = writable(conf.get('config.interface.cookieDocs',true));
export const defaultLang = writable(conf.get('config.interface.defaultLang','en'));
export const denyAllOnLayerClose = writable(conf.get('config.interface.denyAllOnLayerClose',false));
export const groupConsent = writable(conf.get('config.interface.groupConsent',true));
export const layerOpen = writable(false);
export const openSettingsHash = writable(conf.get('config.interface.openSettingsHash','#cookiesjsr'));
export const serviceGroups = writable(groups);
export const activeGroup = writable(active);
export const services = writable(scs.getServicesStatus());
export const settingsAsLink = writable(conf.get('config.interface.settingsAsLink',false));
export const showDenyAll = writable(conf.get('config.interface.showDenyAll', true));

// Mutations
export const openLayer = () => {
    layerOpen.set(true);
    activeGroup.set(active);
}

export const closeLayer = () => {
    layerOpen.set(false);
}

export const openBanner = () => {
    bannerVisible.set(true);
}

export const closeBanner = () => {
    bannerVisible.set(false);
}

export const setMultipleServices = (payload) => {
    services.update((state) => {
        for (const [key, value] of Object.entries(payload)) {
            state[key] = value;
        }
        return state;
    });
}

export const setAllServices = (payload) => {
    services.set(payload);
}

export const setService = (key, value) => {
    services.update((state) => {
        state[key] = value;
        return state;
    });
}

export const setActiveGroup = (payload) => {
    activeGroup.set(payload);
}
