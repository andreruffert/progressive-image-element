# &lt;progressive-image&gt; element

> Progressively enhance image placeholders once they are in the viewport.

[![Test](https://img.shields.io/github/actions/workflow/status/andreruffert/syntax-highlight-element/test.yml?label=Test&logo=github&color=ffc300&labelColor=212121)](https://github.com/andreruffert/progressive-image-element/actions/workflows/test.yml)
[![npm version](https://img.shields.io/npm/v/progressive-image-element.svg?color=ffc300&labelColor=212121)](https://www.npmjs.com/package/progressive-image-element)
[![npm downloads](https://img.shields.io/npm/dm/progressive-image-element?logo=npm&color=ffc300&labelColor=212121)](https://www.npmjs.com/package/progressive-image-element)

* **Faster page load**: Images are loaded only as they enter the viewport, using native browser lazy loading with placeholders
* **Visual stability**: Prevent layout shifts when loading images
* **Save data option**: Load images only on demand
* **No dependencies**: Framework agnostic web component

<div align="center">
  <img src="example-2x.png" alt="progressive image element markup example" width="774">
</div>


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
  The placeholder image should be a solid color placeholder, [LQIP](http://www.guypo.com/introducing-lqip-low-quality-image-placeholders) or [SQIP](https://github.com/technopagan/sqip) that hint at the content of the progressive image before it loads.


## Attributes

- `src` Specifies the image to display
- `srcset` One or more [image candidate strings](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset)
- `sizes` Comma-separated list of [source size descriptors](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes)
- `savedata` Boolean attribute to load the images only after a click/tap on the placeholder image.   
  By default enabled for slow connections (`slow-2g|2g|3g`).


## Styling states

A CSS class `loadable` is present on `<progressive-image>` when the image is ready to load on user interaction (`click`).
Used for slow connections or when the `savedata` attribute is present.
```css
progressive-image.loadable { ... }
```

A CSS class `[loading]` is present on `<progressive-image>` while the image is loading.
```css
progressive-image.loading { ... }
```

A CSS class `.loaded` is present on `<img>` children of `<progressive-image>` when the image was loaded.
```css
progressive-image > img { opacity: 0; }
progressive-image > img.loaded { opacity: 1; }
```


## License

Distributed under the MIT license. See LICENSE for details. 

© [André Ruffert](https://andreruffert.com)
