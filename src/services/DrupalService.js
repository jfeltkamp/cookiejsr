/**
 * Service connects drupalSettings saved as JSON in drupal source code.
 * As default Drupal already has prepared a JS object from the JSON, but
 * if not (as here in a simulated environment) the constructor builds
 * an object built directly from JSON.
 */

class DrupalService {

  constructor() {
    this.simulated = !(typeof window.Drupal === 'object');
    this.drupal = (typeof window.Drupal === 'object') ? window.Drupal : {behaviors: {}};
    let drupalSettings = {};
    if (typeof window.drupalSettings === 'object') {
      drupalSettings = {...window.drupalSettings};
    } else {
      const element = document.querySelector('body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
      drupalSettings = (element !== null) ? JSON.parse(element.textContent) : {}
    }
    this.drupalSettings = (drupalSettings?.cookies) ? drupalSettings.cookies : {}

    this.once = (typeof window.once === 'function') ? window.once
      : (id, selector, context) => {
        return context.querySelectorAll(selector);
      };
  }

  getSimulated() {
    return this.simulated;
  }

  getDrupal() {
    return this.drupal;
  }

  getDrupalSettings(section) {
    if (typeof this.drupalSettings[section] !== 'undefined') {
      return this.drupalSettings[section];
    } else {
      return this.drupalSettings;
    }
  }

  getOnce() {
    return this.once;
  }

}

const drupalService = new DrupalService();
if (typeof drupalService['updateJson'] === 'function') {
  drupalService.updateJson();
}

export const Drupal = drupalService.getDrupal();
export const drupalSettings = drupalService.getDrupalSettings('cookiesjsr');
export const once = drupalService.getOnce();
export const simulated = drupalService.getSimulated();