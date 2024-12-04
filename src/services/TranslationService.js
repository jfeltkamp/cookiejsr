/* eslint-disable */
import conf from "./ConfigService";

class TranslationService {
  /**
   * Set translation object.
   */
  constructor() {
    this.translation = conf.get('translation', {}, 'object');
  }

  /**
   * Get string or object from translation object by query string.
   *
   * @param q {string}
   * @returns {string, object}
   */
  t(q) {
    switch (typeof this.translation[q]) {
      case 'string':
      case 'object':
        return this.translation[q];
      default:
        // console.log('#TRANS:query', q);
        let frag = this.resolve(q);
        return (typeof frag !== 'undefined') ? frag : this.readable(q);
    }
  }

  /**
   * Make query string readable as fallback.
   * @param str {string}
   * @returns {string}
   */
  readable = (str) => {
    str = str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[\s_]+/g, ' ').toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Resolves nested properties in translation object.
   *
   * @param path {string}
   * @param separator {string}
   *
   * @returns {*}
   *   Resolved content of string query.
   */
  resolve = (path, separator) => {
    separator = (typeof separator === 'string' && separator) ? separator : '.';
    let properties = path.split(separator);
    return properties.reduce(function (prev, curr) {
      return prev && prev[curr];
    }, this.translation);
  }
}

const TS = new TranslationService()
export default TS;
export const t = (q) => TS.t(q);
