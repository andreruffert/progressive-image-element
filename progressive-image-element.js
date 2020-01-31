class ProgressiveImageElement extends HTMLElement {
  constructor() {
    super();
    this._placeholderImage = this.querySelector('img');
    this._image = this._placeholderImage?.cloneNode(true) || new Image();
    this._observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this._image.onload = e => e.target.classList.add('loaded');
          this._image.src = entry.target.src;
          this._image.srcset = entry.target.srcset;
          this._image.style.position = 'absolute';
          this._image.style.top = '0';
          this._image.style.left = '0';
          this._observer.unobserve(entry.target);
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
      });
    }, {
      rootMargin: '0px 0px 200px 0px'
    });
  }

  get src() { return this.getAttribute('src'); }
  get srcset() { return this.getAttribute('srcset'); }

  connectedCallback() {
    this._placeholderImage?.classList.add('loaded');
    this._observer.observe(this);
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }
}

export default ProgressiveImageElement;
