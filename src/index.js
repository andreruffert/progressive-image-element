import './style.css';
import ProgressiveImageElement from './progressive-image-element';

export default ProgressiveImageElement;

if (!new URL(import.meta.url).searchParams.has('define', 'false')) {
  window.ProgressiveImageElement = ProgressiveImageElement.define();
}
