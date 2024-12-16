/**
 * Get link attributes derived from uri.
 *
 * @param uri string
 *   A link uri (relative or absolute)
 * @returns {{}}
 *   Link attributes to be attached.
 */
export const getLinkAttributes = (uri) => {
  const attributes = {};
  if (uri.startsWith('http') || uri.startsWith('//')) {
    attributes.target = '_blank';
    try {
      uri = uri.startsWith('//') ? location.protocol + uri : uri;
      if ((typeof location !== 'undefined') && (new URL(uri).origin !== location.origin)) {
        attributes.rel = 'noopener nofollow'
      }
    } catch (exception) {
      // do nothing and continue
    }
  }
  return attributes;
}

/**
 * Get link object with attributes derived from uri.
 *
 * @param uri string
 *   A link uri (relative or absolute)
 * @param title string
 *   A link title (if empty string, uri will be used.)
 * @returns {{}}
 *   Link attributes to be attached.
 */
export const getLink = (uri, title) => {
  let uriSanitized = uri.trim();
  if (uriSanitized) {
    title = title.trim();
    return {
      href: uriSanitized,
      title: (title) ? title : uriSanitized,
      attributes: getLinkAttributes(uriSanitized)
    }
  }
  return null;
}