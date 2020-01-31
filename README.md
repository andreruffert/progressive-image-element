# &lt;progressive-image&gt; element

> A progressive image element

[![npm version](https://img.shields.io/npm/v/progressive-image-element.svg)](https://www.npmjs.com/package/progressive-image-element)
![GitHub file size in bytes](https://img.shields.io/github/size/andreruffert/progressive-image-element/index.js)

Progressively enhance [LQIP](http://www.guypo.com/introducing-lqip-low-quality-image-placeholders) (Low Quality Image Placeholders) once they are in the viewport.

* Lazy loading images
* No content reflow/layout shifting
* No dependencies


## Install

```console
$ npm install progressive-image-element
```


## Usage

1. Include the script & stylesheet within your application

  ```html
  <!-- Include the stylesheet, this could be direct from the package or CDN -->
  <link rel="stylesheet" href="https://unpkg.com/progressive-image-element@latest/dist/progressive-image-element.css" />

  <!-- Include the custom element script, this could be direct from the package or CDN -->
  <script src="https://unpkg.com/progressive-image-element@latest/dist/index.js"></script>
  ```

  or

  ```js
  // Import the custom element script
  import ProgressiveImageElement from 'progressive-image-element';
  ```

2. Use the `<progressive-image>` element markup

  ```html
  <progressive-image
    src="example-image-1x.jpg"
    srcset="example-image-2x.jpg 2x, example-image-1x.jpg 1x"
  >
    <!-- Make sure to specify image dimensions -->
    <img src="placeholder-image.jpg" width="300" height="200" alt="Image" />
  </progressive-image>
  ```


## Examples
- [Simple fadeIn transition - CodePen](https://codepen.io/andreruffert/full/mdyZLrQ)


## Browser support

Browsers without native [custom element support][support] require a [polyfill][].

[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/custom-elements


## License

MIT © [André Ruffert](https://andreruffert.com)
