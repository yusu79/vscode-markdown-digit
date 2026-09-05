const vscode = require('vscode');
const configureMarkdownIt = require('./src/markdown-it');

function getWorkspaceSettings() {
	const configuration = vscode.workspace.getConfiguration('markdownDigit');

	return {
		locale: configuration.get('locale'),
		minDigits: configuration.get('minDigits'),
	};
}

function activate() {
	return {
		extendMarkdownIt(markdownIt) {
			return configureMarkdownIt(markdownIt, getWorkspaceSettings);
		},
	};
}

module.exports = {
	activate,
};
