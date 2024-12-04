/**
 * Catch user consent event from COOKiES application.
 */
document.addEventListener('cookiesjsrUserConsent', function(event) {
  const services = (typeof event.detail.services === 'object') ? event.detail.services : {};
  for (let sid in services) {
    setServiceStaturMessage(sid, services[sid]);
  }
});

/**
 * Insert/update service status message as representation.
 *
 * @param id {string}
 * @param status {boolean}
 * @param services {object}
 */
function setServiceStaturMessage(id, status, services = null) {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = '';
    const content = document.createElement('div');
    const text = (status) ? 'ACTIVE' : 'disabled';
    content.setAttribute('name', id);
    content.setAttribute('role', 'alert');
    content.setAttribute('class', (status) ? 'alert alert-info' : 'alert alert-warning');
    content.innerHTML = `Service <b>${id}</b> is ${text}`;
    element.appendChild(content)
  }
}

/**
 * Config for inline action links.
 */
const actionLinks = {
  enableAll: { all: true },
  disableAll: { all: false },
  enableAnalytic: {groups: { tracking: true }},
  disableAnalytic: {groups: { tracking: false }},
  enableFacebook: {services: { facebook: true }},
  disableFacebook: {services: { facebook: false }},
  enableYoutube: {services: { youtube: true }},
  disableYoutube: {services: { youtube: false }},
  enableAnalytics: {services: { analytics: true }},
  disableAnalytics: {services: { analytics: false }},
  enableGtag: {services: { gtag: true }},
  disableGtag: {services: { gtag: false }}
}

/**
 * Attach events to controllers.
 */
for (let id in actionLinks) {
  const link = document.getElementById(id);
  if (link) {
    attachEvent(link, actionLinks[id]);
  }
}

/**
 * Attach click event to inline action handler.
 *
 * @param element {object}
 * @param options {object}
 */
function attachEvent(element, options) {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('cookiesjsrSetService', {detail: options}))
  });
}
