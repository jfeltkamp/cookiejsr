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

    if (typeof window.drupalSettings === 'object') {
      this.drupalSettings = {...window.drupalSettings};
    } else {
      const element = document.querySelector('body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
      this.drupalSettings = (element !== null) ? JSON.parse(element.textContent) : {}
    }

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


  /**
   * Config loaded from <script> tag in /public/index.html
   * You can update the config by un-comment this code and execute function e.g. in reducer.
   * Updated code must be copy & paste from dev-tools back to the /public/index.html.
   * Then comment in again ...
   * /
  updateJson() {
    const conf = {
      cookiesjsr: {
        config: {
          cookie: {
            name: "cookiesjsr",
            expires: 31536000000,
            domain: "",
            sameSite: "Lax",
            secure: false
          },
          library: {
            libBasePath: "",
            libPath: "",
            scrollLimit: 0
          },
          callback: {
            method: "get",
            url: "/cookies/consent/callback.json",
            headers: []
          },
          interface: {
            openSettingsHash: "#editCookieSettings",
            showDenyAll: true,
            denyAllOnLayerClose: false,
            settingsAsLink: false,
            availableLangs: ["en"],
            defaultLang: "en",
            groupConsent: true,
            cookieDocs: true
          }
        },
        services: {
          default: {
            id: "default",
            services: [{
              key: "base",
              type: "default",
              name: "Required cookies",
              info: {
                value: "<table><thead><tr><th width=\"15%\">Cookie name</th><th width=\"15%\">Default expiration time</th><th>Description</th></tr></thead><tbody><tr><td><code dir=\"ltr\" translate=\"no\">SSESS&lt;ID&gt;</code></td><td>1 month</td><td>If you are logged in to this website, a session cookie is required to identify and connect your browser to your user account in the server backend of this website.</td></tr><tr><td><code dir=\"ltr\" translate=\"no\">cookiesjsr</code></td><td>1 year</td><td>When you visited this website for the first time, you were asked for your permission to use several services (including those from third parties) that require data to be saved in your browser (cookies, local storage). Your decisions about each service (allow, deny) are stored in this cookie and are reused each time you visit this website.</td></tr></tbody></table>",
                format: "full_html"
              },
              uri: "",
              needConsent: false
            }],
            weight: 1
          },
          tracking: {
            id: "tracking",
            services: [{
              key: "analytics",
              type: "tracking",
              name: "Google Analytics",
              info: {format: "full_html", value: ""},
              uri: "https://support.google.com/analytics/answer/6004245",
              needConsent: true
            }, {
              key: "gtag",
              type: "tracking",
              name: "Google Tag Manager",
              info: {format: "full_html", value: ""},
              uri: "https://www.gtag.com/digital/datenschutz-0",
              needConsent: true
            }],
            weight: 10
          },
          social: {
            id: "social",
            services: [{
              key: "facebook",
              type: "social",
              name: "Facebook",
              info: {format: "full_html", value: ""},
              uri: "https://help.facebook.com/196883487377501",
              needConsent: true
            }],
            weight: 20
          },
          video: {
            id: "video",
            services: [{
              key: "youtube",
              type: "video",
              name: "Video provided by YouTube",
              info: {format: "full_html", value: ""},
              uri: "https://policies.google.com/privacy",
              needConsent: true
            }],
            weight: 40
          }
        },
        translation: {
          langcode: "en",
          default_langcode: "en",
          bannerText: "We use a selection of our own and third-party cookies on the pages of this website: Essential cookies, which are required in order to use the website; functional cookies, which provide better easy of use when using the website; performance cookies, which we use to generate aggregated data on website use and statistics; and marketing cookies, which are used to display relevant content and advertising. If you choose \"ACCEPT ALL\", you consent to the use of all cookies. You can accept and reject individual cookie types and  revoke your consent for the future at any time under \"Settings\".",
          privacyPolicy: "Privacy policy",
          privacyUri: "",
          imprint: "Imprint",
          imprintUri: "",
          cookieDocs: "Cookie documentation",
          cookieDocsUri: "/cookies/documentation",
          denyAll: "Deny all",
          settings: "Cookie settings",
          acceptAll: "Accept all",
          allowAll: "Accept all",
          cookieSettings: "Cookie settings",
          close: "Close",
          officialWebsite: "View official website",
          requiredCookies: "Required cookies",
          readMore: "Read more",
          allowed: "allowed",
          denied: "denied",
          alwaysActive: "Always active",
          settingsAllServices: "Settings for all services",
          saveSettings: "Save",
          credit: "",
          default: {
            title: "What are Cookies?",
            details: "Cookies are small text files that are placed by your browser on your device in order to store certain information. Using the information that is stored and returned, a website can recognize that you have previously accessed and visited it using the browser on your end device. We use this information to arrange and display the website optimally in accordance with your preferences. Within this process, only the cookie itself is identified on your device. Personal data is only stored following your express consent or where this is absolutely necessary to enable use the service provided by us and accessed by you."
          },
          tracking: {
            title: "Tracking cookies",
            details: "Marketing cookies come from external advertising companies (\"third-party cookies\") and are used to collect information about the websites visited by the user. The purpose of this is to create and display target group-oriented content and advertising for the user."
          },
          social: {
            title: "Social Plugins",
            details: "Comments managers facilitate the filing of comments and fight against spam."
          },
          video: {
            title: "Video",
            details: "Video sharing services help to add rich media on the site and increase its visibility."
          }
        }
      },
    };

    console.log("DON'T FORGET TO COMMENT IN THE updateJson() FUNCTION.")

    const element = document.querySelector('body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
    element.textContent = JSON.stringify(conf);
  }

  /*
  * END updateJson().
  */
}

const drupalService = new DrupalService();
if (typeof drupalService['updateJson'] === 'function') {
  drupalService.updateJson();
}

export const Drupal = drupalService.getDrupal();
export const drupalSettings = drupalService.getDrupalSettings('cookiesjsr');
export const once = drupalService.getOnce();
export const simulated = drupalService.getSimulated();