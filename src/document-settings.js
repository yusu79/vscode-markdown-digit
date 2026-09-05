const yaml = require('js-yaml');

const FRONT_MATTER_PATTERN = /^(?:\uFEFF)?---[ \t]*\r?\n([\s\S]*?)\r?\n(?:---|\.\.\.)[ \t]*(?:\r?\n|$)/;

function isObject(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function pickDigitSettings(value) {
	if (!isObject(value)) {
		return {};
	}

	const settings = {};

	if (Object.hasOwn(value, 'locale')) {
		settings.locale = value.locale;
	}

	if (Object.hasOwn(value, 'minDigits')) {
		settings.minDigits = value.minDigits;
	}

	return settings;
}

function parseFrontMatterSettings(source) {
	const match = FRONT_MATTER_PATTERN.exec(source);

	if (match === null) {
		return {};
	}

	try {
		const frontMatter = yaml.load(match[1]);

		if (!isObject(frontMatter) || !isObject(frontMatter.markdown)) {
			return {};
		}

		return pickDigitSettings(frontMatter.markdown.digit);
	} catch {
		return {};
	}
}

function normalizeWorkspaceSettings(settings) {
	const normalized = pickDigitSettings(settings);

	if (normalized.locale === '') {
		delete normalized.locale;
	}

	return normalized;
}

function createDocumentSettingsRule(getWorkspaceSettings) {
	return (state) => {
		const workspaceSettings = normalizeWorkspaceSettings(getWorkspaceSettings());
		const frontMatterSettings = parseFrontMatterSettings(state.src);

		state.env.markdownDigit = {
			...workspaceSettings,
			...frontMatterSettings,
		};
	};
}

module.exports = {
	createDocumentSettingsRule,
	parseFrontMatterSettings,
};
