import ProgressiveImageElement from './progressive-image-element';
export { ProgressiveImageElement as default }

export const ELEMENT_NAME = 'progressive-image';

if (!window.customElements.get(ELEMENT_NAME)) {
  window.ProgressiveImageElement = ProgressiveImageElement;
  window.customElements.define(ELEMENT_NAME, ProgressiveImageElement);
}
