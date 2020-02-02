import '../../index.js';

describe('element creation', function() {
  it('creates from document.createElement', function() {
    const el = document.createElement('progressive-image');
    assert.equal('PROGRESSIVE-IMAGE', el.nodeName);
    assert.isTrue(el instanceof window.ProgressiveImageElement);
  });

  it('creates from constructor', function() {
    const el = new window.ProgressiveImageElement();
    assert.equal('PROGRESSIVE-IMAGE', el.nodeName);
  });
});
