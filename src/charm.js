import * as allIcons from './icons/index';
import DEFAULT_ATTRS from './default-attrs.json';

/**
   * Convert object attributes to XML attribute string.
   * @example
   * // returns 'class="a b" fill="none"'
   * attrsToString({ class: 'a b', fill: 'none', })
   * @param {Object} attrs The attributes to convert to a `string`.
   * @returns {string} The attributes as XML
   */
function attrsToString(attrs) {
  return Object.entries(attrs)
    .map(([attr, val]) => `${attr}="${val}"`)
    .join(' ');
}

/**
 * Get the combined attributes of an icon and given attributes.
 * @param {Object} icon An icon object. (`{name, paths, keywords}`)
 * @param {Object} attrs (Optional) additional attributes.
 * @returns {Object}
 */
export function getAttrs(icon, attrs = {}) {
  return {
    ...DEFAULT_ATTRS,
    ...attrs,
    ...{ class: `charm charm-${icon.name}${attrs.class ? ` ${attrs.class}` : ''}` },
  };
}

/**
 * Converts an icon object to an SVG string.
 * @param {Object} icon Icon object to convert.
 * @param {Object} attrs (Optional) attributes to add to the SVG root.
 * @returns {string} The icon as a `string` in SVG format.
 */
export const toSvg = (icon, attrs = {}) => `<svg ${attrsToString(getAttrs(icon, attrs))}>${icon.paths}</svg>`;

/**
 * Converts an icon object to an SVG `HTMLElement`.
 * @param {Object} icon Icon object to convert.
 * @param {Object} attrs (Optional) attributes to add to the element.
 * @returns {HTMLElement} The icon as an SVG `HTMLElement`.
 */
export const toElement = (icon, attrs = {}) => new DOMParser().parseFromString(toSvg(icon, attrs), 'image/svg+xml').querySelector('svg');

/**
 * Replaces a `HTMLElement` with an icon.
 * @param {HTMLElement} element The `HTMLElement` to replace.
 * @param {Object} icon Icon to be transformed into a `HTMLElement` and placed.
 * @param {Object} attrs (Optional) attributes to add to the element.
 * @param {replaceAttr} Element attribute to be ignored.
 */
export function replaceElement(element, icon, attrs = {}, replaceAttr = 'data-charm') {
  const elemAttrs = Array.from(element.attributes).reduce((attrs_, attr) => ({
    ...attrs_,
    ...{ [attr.name]: attr.value },
  }), {});
  delete elemAttrs[replaceAttr];

  const iconElement = toElement(icon, { ...attrs, ...elemAttrs });
  return element.parentNode.replaceChild(iconElement, element);
}

/**
 * Replaces all elements with the `replaceAttr` attribute with the respective icon.
 * @param {{ icons?: object, attrs?: object, replaceAttr?: string }} Charm options.
 */
export function placeIcons({ icons = {}, attrs = {}, replaceAttr = 'data-charm' } = {}) {
  if (typeof document === 'undefined') {
    throw new Error('`placeIcons()` only works in a browser environment.');
  }

  const iconList = Object.values(icons);

  if (!iconList.length) {
    throw new Error('No icons provided to replace. Please provide your icon objects.');
  }

  const iconMap = iconList.reduce((a, icon) => Object.assign(a, { [icon.name]: icon }), {});
  const elementsToReplace = document.querySelectorAll(`[${replaceAttr}]`);

  elementsToReplace.forEach((element) => {
    replaceElement(element, iconMap[element.getAttribute(replaceAttr)], attrs, replaceAttr);
  });
}

/**
 * Export all icon modules.
 */
export { allIcons as icons };
export * from './icons/index';
