import ProgressiveImageElement from './progressive-image-element';
import { ELEMENT_NAME } from './constants';
export { ProgressiveImageElement as default }

if (!window.customElements.get(ELEMENT_NAME)) {
  window.ProgressiveImageElement = ProgressiveImageElement;
  window.customElements.define(ELEMENT_NAME, ProgressiveImageElement);
}
