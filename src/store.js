import {get, writable} from 'svelte/store';
import conf from "./services/ConfigService";
import scs from "./services/StoreCookieService";

// State
export const activeGroup = writable('default');
export const bannerVisible = writable(scs.isUpdateRequired());
export const cookieDocs = writable(conf.get('config.interface.cookieDocs',true));
export const defaultLang = writable(conf.get('config.interface.defaultLang','en'));
export const denyAllOnLayerClose = writable(conf.get('config.interface.denyAllOnLayerClose',false));
export const groupConsent = writable(conf.get('config.interface.groupConsent',true));
export const layerOpen = writable(false);
export const openSettingsHash = writable(conf.get('config.interface.openSettingsHash','#cookiesjsr'));
export const serviceGroups = writable(conf.getServiceGroups());
export const services = writable(scs.getServicesStatus());
export const settingsAsLink = writable(conf.get('config.interface.settingsAsLink',false));
export const showDenyAll = writable(conf.get('config.interface.showDenyAll', true));

// Mutations
export const openLayer = () => {
    layerOpen.set(true);
    activeGroup.set('default');
}

export const closeLayer = () => {
    layerOpen.set(false);
    activeGroup.set('default');
}

export const openBanner = () => {
    bannerVisible.set(true);
}

export const closeBanner = () => {
    bannerVisible.set(false);
}

export const setMultipleServices = (payload) => {
    console.log('setMultipleServices')
    services.update((state) => {
        for (const [key, value] of Object.entries(payload)) {
            state[key] = value;
        }
        return state;
    });
}

export const setAllServices = (payload) => {
    console.log('setAllServices')
    services.set(payload);
}

export const setService = (key, value) => {
    console.log('setService')
    services.update((state) => {
        state[key] = value;
        return state;
    });
}

export const setActiveGroup = (payload) => {
    activeGroup.set(payload);
}

services.subscribe(value => {
    console.log('services update: ', value);
}); // logs '0'