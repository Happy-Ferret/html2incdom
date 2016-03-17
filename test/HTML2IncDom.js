'use strict';

import HTML2IncDom from '../src/HTML2IncDom';

describe('HTML2IncDom', function() {
	it('should render html inside element via incremental dom', function() {
		var element = document.createElement('div');
		var htmlStr = '<div class="inner">Foo</div>';
		IncrementalDOM.patch(element, () => HTML2IncDom.run(htmlStr));
		assert.strictEqual(htmlStr, element.innerHTML);
	});

	it('should render void elements from html via incremental dom', function() {
		var element = document.createElement('div');
		var htmlStr = '<input type="text">';
		IncrementalDOM.patch(element, () => HTML2IncDom.run(htmlStr));
		assert.strictEqual(htmlStr, element.innerHTML);
	});

	it('should build function for rendering html via incremental dom', function() {
		var element = document.createElement('div');
		var htmlStr = '<div class="inner">Foo</div>';
		var fn = HTML2IncDom.buildFn(htmlStr);
		assert.strictEqual(0, element.childNodes.length);

		IncrementalDOM.patch(element, fn);
		assert.strictEqual(htmlStr, element.innerHTML);
	});

	it('should allow parser to be replaced by another with equivalent api', function() {
		HTML2IncDom.setParser(function(html, handlers) {
			handlers.start('div', [{name: 'class', value: 'inner'}]);
			handlers.chars('Foo-CustomParser');
			handlers.end('div');
		});

		var element = document.createElement('div');
		var htmlStr = '<div class="inner">Foo</div>';
		IncrementalDOM.patch(element, () => HTML2IncDom.run(htmlStr));
		assert.strictEqual('<div class="inner">Foo-CustomParser</div>', element.innerHTML);
	});
});
