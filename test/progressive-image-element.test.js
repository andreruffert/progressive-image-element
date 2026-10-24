import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

class SyntheticImage {
  tagName = 'IMG';
  classList = { add() {} };

  getAttribute(name) {
    return name === 'width' || name === 'height' ? '1' : null;
  }

  cloneNode() {
    return new SyntheticImage();
  }
}

class SyntheticHTMLElement {
  classList = { add() {}, remove() {} };

  querySelector() {
    return new SyntheticImage();
  }
}

globalThis.HTMLImageElement = class {};
Object.defineProperty(globalThis.HTMLImageElement.prototype, 'loading', { value: 'lazy' });
globalThis.HTMLElement = SyntheticHTMLElement;

const modulePath = new URL('../src/progressive-image-element.js', import.meta.url);
const moduleSource = await readFile(modulePath, 'utf8');
const testableSource = moduleSource.replace(
  "import { DEFAULT_TAG_NAME, MESSAGES } from './constants';",
  "const DEFAULT_TAG_NAME = 'progressive-image';\nconst MESSAGES = { placeholderElement: { missing: '' }, dimensions: { missing: '' } };",
);
assert.notEqual(testableSource, moduleSource, 'expected the component constants import');
const sourceUrl = `data:text/javascript;base64,${Buffer.from(testableSource).toString('base64')}`;
const { default: ProgressiveImageElement } = await import(sourceUrl);

test('disconnecting an instance with native lazy loading is safe', () => {
  const element = new ProgressiveImageElement();
  assert.doesNotThrow(() => element.disconnectedCallback());
});

test('disconnecting still releases an observer when one exists', () => {
  const element = new ProgressiveImageElement();
  let disconnected = false;
  element._observer = {
    disconnect() {
      disconnected = true;
    },
  };

  element.disconnectedCallback();
  assert.equal(disconnected, true);
});
