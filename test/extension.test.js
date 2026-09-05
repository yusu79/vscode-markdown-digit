const assert = require('assert');
const MarkdownIt = require('markdown-it');
const extension = require('../extension');
const configureMarkdownIt = require('../src/markdown-it');

function createMarkdownIt(settings = {}) {
	return configureMarkdownIt(new MarkdownIt(), () => settings);
}

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

	test('formats ordinary numbers using the workspace settings', () => {
		const markdownIt = createMarkdownIt({ locale: 'en', minDigits: 4 });

		assert.strictEqual(
			markdownIt.renderInline('999 1000 1234567'),
			'999 1,000 1,234,567',
		);
	});

	test('uses YAML Front Matter settings for the complete document', () => {
		const markdownIt = createMarkdownIt();
		const source = [
			'---',
			'markdown:',
			'  digit:',
			'    locale: jp',
			'    minDigits: 4',
			'---',
			'',
			'# Report 2026',
			'',
			'Sales were 123456789 yen.',
		].join('\n');
		const html = markdownIt.render(source);

		assert.match(html, /Report 2026/);
		assert.match(
			html,
			/Sales were 1<sub>億<\/sub>2345<sub>万<\/sub>6789 yen\./,
		);
	});

	test('overrides workspace settings with YAML properties', () => {
		const markdownIt = createMarkdownIt({ locale: 'jp', minDigits: 6 });
		const source = [
			'---',
			'markdown:',
			'  digit:',
			'    locale: en',
			'    minDigits: 5',
			'---',
			'',
			'12345 123456789',
		].join('\n');
		const html = markdownIt.render(source);

		assert.match(html, /12,345 123,456,789/);
	});

	test('falls back to individual workspace properties omitted from YAML', () => {
		const markdownIt = createMarkdownIt({ locale: 'en', minDigits: 6 });
		const source = [
			'---',
			'markdown:',
			'  digit:',
			'    locale: jp',
			'---',
			'',
			'12345 123456',
		].join('\n');
		const html = markdownIt.render(source);

		assert.match(html, /12345 12<sub>万<\/sub>3456/);
	});

	test('falls back to workspace settings when YAML is invalid', () => {
		const markdownIt = createMarkdownIt({ locale: 'en', minDigits: 4 });
		const source = [
			'---',
			'markdown: [',
			'---',
			'',
			'1234567',
		].join('\n');

		assert.match(markdownIt.render(source), /1,234,567/);
	});

	test('keeps explicit locale and raw markers above document defaults', () => {
		const markdownIt = createMarkdownIt({ locale: 'jp', minDigits: 4 });

		assert.strictEqual(
			markdownIt.renderInline('123456789 $123456789${en} $123456789${raw}'),
			'1<sub>億</sub>2345<sub>万</sub>6789 123,456,789 123456789',
		);
	});

	test('does not automatically format excluded Markdown content', () => {
		const markdownIt = createMarkdownIt({ locale: 'en', minDigits: 4 });
		const source = [
			'Text 1234567',
			'',
			'`1234567`',
			'',
			'https://example.com/1234567',
			'',
			'```js',
			'const value = 1234567;',
			'```',
		].join('\n');
		const html = markdownIt.render(source);

		assert.match(html, /Text 1,234,567/);
		assert.match(html, /<code>1234567<\/code>/);
		assert.match(html, /https:\/\/example\.com\/1234567/);
		assert.match(html, /const value = 1234567;/);
	});
});
