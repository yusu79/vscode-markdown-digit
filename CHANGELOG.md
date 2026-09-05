# Change Log

All notable changes to the "Markdown Digit" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [1.1.0] - 2026-09-05

### Added

- Support document-wide automatic number formatting with the `markdownDigit.locale` and `markdownDigit.minDigits` VS Code settings.
- Read per-document `markdown.digit` settings from YAML Front Matter, with YAML overriding VS Code settings.
- Support explicit locale overrides and the `raw` marker from `markdown-it-digit` 1.1.0.
- Localize the extension metadata and configuration descriptions in Japanese, Simplified Chinese, Korean, and Traditional Chinese, with English as the default.
- Add Simplified Chinese, Korean, and Traditional Chinese README files and localized preview examples.

### Changed

- Update `markdown-it-digit` from 1.0.0 to 1.1.0.

## [1.0.0] - 2026-09-02

### Added

- Integrate `markdown-it-digit` with the Visual Studio Code Markdown preview.
- Support the `en`, `in`, `jp`, `cn`, `kr`, and `tw` locale markers.
- Preserve ordinary numbers, invalid syntax, and unsupported locale markers.
- Document the extension syntax, supported locales, and non-transformed content.
