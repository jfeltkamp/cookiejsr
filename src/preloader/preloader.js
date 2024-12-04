import cookieService from "../services/StoreCookieService";
import config from "../services/ConfigService";
import debounce from "../services/Debounce";
import packageJson from '../../package.json';

export default class preloader {

  constructor() {
    this.appLoaded = false;
    this.scrollController();
    this.hashController();
  }

  /**
   * Load App if scrolling down exceeds the limit.
   */
  scrollController() {
    const limit = config.get('config.library.scrollLimit', 150);
    const self = this;
    if (limit === 0) {
      self.loadApp();
    } else {
      let load = debounce(function() {
        if (document.body.scrollTop > limit || document.documentElement.scrollTop > limit) {
          if(cookieService.isUpdateRequired()) {
            self.loadApp();
          }
          window.removeEventListener('scroll', load);
        }
      }, 100);
      window.addEventListener('scroll', load);
    }
  }

  /**
   * Load app by listen on hash changes.
   */
  hashController() {
    const self = this;
    let hashListener = function() {
      if (self.hashCheck()) {
        self.loadApp();
        window.removeEventListener('scroll', hashListener);
      }
    };
    window.addEventListener("hashchange", hashListener);
    // Initial check.
    hashListener();
  }

  /**
   * Check location hash  app by listen on hash changes.
   */
  hashCheck() {
    const hash = config.get('config.interface.openSettingsHash', '#cookiesjsr');
    return (window.location.hash === hash);
  }

  /**
   * Just load the app from location given in config.
   *
   * @returns {boolean}
   */
  loadApp() {
    const libPath = config.get('config.library.libPath', '');
    if (!this.appLoaded && libPath) {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = libPath + '?v=' + packageJson.version;
      document.head.appendChild(script);
      this.appLoaded = true;
    }
  }
}

