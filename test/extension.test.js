const assert = require('assert');
const MarkdownIt = require('markdown-it');
const extension = require('../extension');

suite('Extension Test Suite', () => {
	test('exposes the Markdown extension API', () => {
		const api = extension.activate();

		assert.strictEqual(typeof api.extendMarkdownIt, 'function');
	});

	test('extends and returns the provided MarkdownIt instance', () => {
		const api = extension.activate();
		const originalMarkdownIt = new MarkdownIt();
		const extendedMarkdownIt = api.extendMarkdownIt(originalMarkdownIt);

		assert.strictEqual(extendedMarkdownIt, originalMarkdownIt);
		assert.strictEqual(
			extendedMarkdownIt.renderInline('$1234567${en}'),
			'1,234,567',
		);
	});

	test('formats every supported locale through the extension', () => {
		const markdownIt = extension.activate().extendMarkdownIt(new MarkdownIt());
		const examples = [
			['$123456789${en}', '123,456,789'],
			['$123456789${in}', '12,34,56,789'],
			['$123456789${jp}', '1<sub>億</sub>2345<sub>万</sub>6789'],
			['$123456789${cn}', '1<sub>亿</sub>2345<sub>万</sub>6789'],
			['$123456789${kr}', '1<sub>억</sub>2345<sub>만</sub>6789'],
			['$123456789${tw}', '1<sub>億</sub>2345<sub>萬</sub>6789'],
		];

		for (const [source, expected] of examples) {
			assert.strictEqual(markdownIt.renderInline(source), expected);
		}
	});

	test('leaves ordinary numbers and unsupported syntax unchanged', () => {
		const markdownIt = extension.activate().extendMarkdownIt(new MarkdownIt());
		const examples = [
			'1234567',
			'$1234567${unknown}',
			'$1234567${EN}',
			'$1234567',
		];

		for (const source of examples) {
			assert.strictEqual(markdownIt.renderInline(source), source);
		}
	});
});
