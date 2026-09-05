const markdownItDigit = require('markdown-it-digit');
const { createDocumentSettingsRule } = require('./document-settings');

function configureMarkdownIt(markdownIt, getWorkspaceSettings) {
	markdownIt.use(markdownItDigit);
	markdownIt.core.ruler.before(
		'automatic_digit',
		'markdown_digit_document_settings',
		createDocumentSettingsRule(getWorkspaceSettings),
	);

	return markdownIt;
}

module.exports = configureMarkdownIt;
