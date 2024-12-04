/* eslint-disable */
import { drupalSettings } from "./DrupalService";

class ConfigService {
  // Set initial configuration
  constructor(config) {
    config = (typeof config === 'object') ? config : {};
    this.config = config;
  }

  /**
   * Type checked getter for config settings.
   * Returns also nested config properties, if name is an object path
   * e.g. "config.cookie.name".
   *
   * @param name {string}
   *   Name or object query path of config.
   *
   * @param fallback {*}
   *   Fallback to return IF requested config not found OR IF type of return value
   *   differs from type of fallback.
   *
   * @returns {*}
   *   Returns requested config or null, if fallback not set.
   *   If fallback IS set and requested config IS NOT defined, method returns
   *   fallback.
   *   If requested config AND fallback IS defined, data types of both must be equal
   *   => if EQUAL method returns requested config, if NOT EQUAL returns fallback.
   */
  get(name, fallback = null) {
    if (name === '') {
      return this.config;
    }
    let returnValue;
    switch (typeof this.config[name]) {
      case 'string':
      case 'object':
      case 'number':
      case 'boolean':
        returnValue = this.config[name];
        break;
      default:
        let frag = this.resolve(name);
        returnValue = (typeof frag !== 'undefined') ? frag : fallback;
    }
    return (
        (fallback === null) ||
        (returnValue === fallback) ||
        (typeof returnValue === typeof fallback)
    ) ? returnValue : fallback;
  }

  /**
   * Resolves nested properties in config object.
   *
   * @param path {string}
   * @param separator {string}
   *
   * @returns {*}
   *   Resolved content of string query.
   */
  resolve(path, separator='.') {
    // console.log('#ConfigService::resolve', path)
    let properties = path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], this.config)
  }


  /**
   * Extract service ids from raw config data as prepared param for serviceActivationStatus.
   *
   * @returns {[]}
   */
  getServiceIds() {
    const serviceGroups = this.get('services', {});
    // Prepare group configuration.
    let services = []; // Services list for user decisions.
    for (let groupId in serviceGroups) {
      let group = serviceGroups[groupId];
      if (typeof group.services === 'object') {
        // Hang services into the list for user decisions.
        for (let srvcId in group.services) {
          let srvc = group.services[srvcId];
          if (typeof srvc.key === 'string') {
            services.push(srvc.key);
          }
        }
      }
    }
    return services;
  }

  /**
   * Return Service groups.
   *
   * @returns {{}}
   */
  getServiceGroups() {
    const groups = this.get('services', {});
    let serviceGroups = {};
    for (let groupId in groups) {
      let group = groups[groupId];
      if (typeof group.services === 'object') {
        serviceGroups[groupId] = group;
      }
    }
    return serviceGroups;
  }
}

const CS = new ConfigService(drupalSettings);
export default CS;
