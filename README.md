# Markdown Digit

[English](README.md) | [日本語](README.jp.md)

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-1.125.0%2B-007ACC)
![License](https://img.shields.io/github/license/yusu79/vscode-markdown-digit)

Formats locale-marked integers in the Visual Studio Code Markdown preview using
[`markdown-it-digit`](https://www.npmjs.com/package/markdown-it-digit).

The extension changes only the rendered preview. It does not modify the Markdown
source in the editor.

## Installation

Search for "Markdown Digit" in the Visual Studio Code Extensions view.

## Usage

Open a Markdown file and write an integer using the following syntax:

```md
$<number>${<locale>}
```

For example:

```md
$1234567${en}
```

The preview renders this as `1,234,567`, while the source remains unchanged.

`<number>` must contain one or more ASCII digits (`0`–`9`). Leading zeros are
preserved, and locale identifiers are case-sensitive.

## Document-wide automatic formatting

Set a default locale in VS Code settings to automatically format ordinary numbers throughout Markdown documents. Automatic formatting is disabled by default.

```json
{
    "markdownDigit.locale": "jp",
    "markdownDigit.minDigits": 4
}
```

`markdownDigit.locale` accepts `en`, `in`, `jp`, `cn`, `kr`, or `tw`. Select the empty value to disable automatic formatting.

`markdownDigit.minDigits` controls the minimum number of digits to format and defaults to `4`. For example, with `locale: en` and `minDigits: 4`, `999` remains unchanged while `1000` becomes `1,000`.

To override these defaults for one document, add YAML Front Matter at the start of the Markdown file:

```yaml
---
markdown:
  digit:
    locale: jp
    minDigits: 4
---
```

In this document, an ordinary `123456789` is rendered as `1億2345万6789`. YAML Front Matter is read only at the start of a document. Invalid YAML and Front Matter without `markdown.digit` are ignored, so the VS Code settings remain in effect.

Settings are resolved per property in this order:

```text
Explicit marker
> YAML Front Matter
> VS Code settings
> No setting
```

Even when document-wide formatting is active, an explicit locale such as `$1234567${en}` overrides it for that number. Use `$1234567${raw}` to remove the marker and render `1234567` without formatting.

## Supported locales

| Locale | Preview output for `$123456789${locale}` |
| --- | --- |
| `en` | `123,456,789` |
| `in` | `12,34,56,789` |
| `jp` | `1`億`2345`万`6789` |
| `cn` | `1`亿`2345`万`6789` |
| `kr` | `1`억`2345`만`6789` |
| `tw` | `1`億`2345`萬`6789` |

The East Asian units are rendered as subscript text in the Markdown preview.
`jp`, `cn`, `kr`, and `tw` are format identifiers defined by
`markdown-it-digit`; they are not ISO language codes or BCP 47 language tags.

## Content that is not transformed

The extension leaves the following content unchanged:

- ordinary numbers when no locale is configured for automatic formatting
- invalid syntax and unsupported or incorrectly cased locales
- fenced and indented code blocks
- inline code
- URLs and Markdown link destinations
- HTML attributes and HTML comments
- syntax escaped with a Markdown backslash

For complete parsing and formatting behavior, see the
[`markdown-it-digit` documentation](https://github.com/yusu79/markdown-it-digit#readme)
and its
[specification](https://github.com/yusu79/markdown-it-digit/blob/main/docs/specification.md).

## Requirements

- Visual Studio Code 1.125.0 or later

## License

[MIT](LICENSE)
