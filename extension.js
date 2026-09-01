const markdownItDigit = require('markdown-it-digit');

function activate() {
	return {
		extendMarkdownIt(markdownIt) {
			return markdownIt.use(markdownItDigit);
		},
	};
}

module.exports = {
	activate,
};
