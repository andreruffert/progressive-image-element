import { MESSAGES } from './constants';
const LAZY_LOADING_SUPPORT = 'loading' in HTMLImageElement.prototype;

class ProgressiveImageElement extends HTMLElement {
  constructor() {
    super();
    const placeholderElement = this.querySelector('img, svg');
    const width = placeholderElement?.getAttribute('width');
    const height = placeholderElement?.getAttribute('height');
    if (!placeholderElement) console.warn(MESSAGES.placeholderElement.missing);
    if (placeholderElement && (!width && !height)) console.warn(MESSAGES.dimensions.missing);
    this._placeholderImage = placeholderElement?.tagName === 'IMG' ? placeholderElement : null;
    this._image = this._placeholderImage?.cloneNode(true) || new Image();
    if (LAZY_LOADING_SUPPORT) return;

    this._observer = new IntersectionObserver((entries, observer) => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        this.enhancePlaceholderImage(entry.target);
        this._observer.unobserve(this);
      });
    }, {
      rootMargin: '0px 0px 200px 0px'
    });
  }

  get src() { return this.getAttribute('src'); }
  get srcset() { return this.getAttribute('srcset'); }
  get sizes() { return this.getAttribute('sizes'); }
  get savedata() { return this.hasAttribute('savedata'); }

  enhancePlaceholderImage() {
    if (!this.src && !this.srcset) return;
    this.classList.add('loading');
    this._image.onload = e => {
      e.target.classList.add('loaded');
      this.classList.remove('loadable');
      this.classList.remove('loading');
    };
    this._image.loading = 'lazy';
    this._image.src = this.src;
    if (this.srcset) this._image.srcset = this.srcset;
    if (this.sizes) this._image.sizes = this.sizes;
    this._image.style.position = 'absolute';
    this._image.style.top = '0';
    this._image.style.left = '0';
    this.appendChild(this._image);

    // TODO:
    // The decoding of large images can block the main thread.
    // this._image.decode().then(() => {
    //   this.appendChild(this._image);
    //   this._image.classList.add('loaded');
    // }).catch(error => {
    //   console.error(error);
    //   throw new Error(`Could not load/decode image (${this._image.src}).`);
    // });
  }

  connectedCallback() {
    if (this.savedata || /\slow-2g|2g|3g/.test(navigator?.connection?.effectiveType)) {
      this.addEventListener('click', this.enhancePlaceholderImage, { once: true });
      this.classList.add('loadable');
    } else {
      if (LAZY_LOADING_SUPPORT) {
        this.enhancePlaceholderImage();
      } else {
        this._observer.observe(this);
      }
    }
    this._placeholderImage?.classList.add('loaded');
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }
}

export default ProgressiveImageElement;
