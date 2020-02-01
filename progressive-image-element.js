class ProgressiveImageElement extends HTMLElement {
  constructor() {
    super();
    this._placeholderImage = this.querySelector('img');
    this._image = this._placeholderImage?.cloneNode(true) || new Image();
    this._observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.enhancePlaceholderImage(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px 200px 0px'
    });
  }

  get src() { return this.getAttribute('src'); }
  get srcset() { return this.getAttribute('srcset'); }

  enhancePlaceholderImage() {
    this._image.onload = e => e.target.classList.add('loaded');
    this._image.src = this.src;
    this._image.srcset = this.srcset;
    this._image.style.position = 'absolute';
    this._image.style.top = '0';
    this._image.style.left = '0';
    this._observer.unobserve(this);
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
    if (/\slow-2g|2g|3g/.test(navigator.connection.effectiveType)) {
      this.addEventListener('click', this.enhancePlaceholderImage, { once: true });
    } else {
      this._observer.observe(this);
    }
    this._placeholderImage?.classList.add('loaded');
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }
}

export default ProgressiveImageElement;


// TODO:
// function onConnectionChange() {
//   const { rtt, downlink, effectiveType,  saveData } = navigator.connection;
//   console.log(`Effective network connection type: ${effectiveType}`);
//   console.log(`Downlink Speed/bandwidth estimate: ${downlink}Mb/s`);
//   console.log(`Round-trip time estimate: ${rtt}ms`);
//   console.log(`Data-saver mode on/requested: ${saveData}`);
// }
//
// navigator.connection.addEventListener('change', onConnectionChange);
