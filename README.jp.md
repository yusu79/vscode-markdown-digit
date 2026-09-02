# vscode-markdown-digit

[English](README.md) | [日本語](README.jp.md)

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-1.125.0%2B-007ACC)
![License](https://img.shields.io/github/license/yusu79/vscode-markdown-digit)

[`markdown-it-digit`](https://www.npmjs.com/package/markdown-it-digit)を使用して、
ロケールを指定した整数をVisual Studio CodeのMarkdownプレビュー内で整形します。

この拡張機能が変更するのはレンダリングされたプレビューだけです。
エディター内のMarkdownソースは変更せず、コマンドや設定項目も追加しません。

## インストール
Visual Studio Code の拡張機能で「Markdown Digit」と入力してください｡

## 使用方法

Markdownファイルを開き、次の構文で整数を記述します。

```md
$<number>${<locale>}
```

例:

```md
$1234567${en}
```

プレビューでは`1,234,567`と表示され、ソースは変更されません。

`<number>`には1文字以上のASCII数字（`0`～`9`）を指定します。
先頭のゼロは維持され、ロケール識別子では大文字と小文字が区別されます。

## 対応ロケール

| ロケール | `$123456789${locale}`のプレビュー表示 |
| --- | --- |
| `en` | `123,456,789` |
| `in` | `12,34,56,789` |
| `jp` | `1`億`2345`万`6789` |
| `cn` | `1`亿`2345`万`6789` |
| `kr` | `1`억`2345`만`6789` |
| `tw` | `1`億`2345`萬`6789` |

東アジアの単位はMarkdownプレビュー内で下付き文字として表示されます。
`jp`、`cn`、`kr`、`tw`は`markdown-it-digit`で定義された形式識別子であり、
ISO言語コードやBCP 47言語タグではありません。

## 変換されない内容

この拡張機能は、次の内容を変更しません。

- 明示的なロケール構文を伴わない通常の数値
- 無効な構文、未対応のロケール、大文字と小文字が誤っているロケール
- フェンスコードブロックとインデントコードブロック
- インラインコード
- URLとMarkdownリンクのリンク先
- HTML属性とHTMLコメント
- Markdownのバックスラッシュでエスケープされた構文

解析および整形の完全な動作については、
[`markdown-it-digit`のドキュメント](https://github.com/yusu79/markdown-it-digit/blob/main/README.jp.md)と
[仕様書](https://github.com/yusu79/markdown-it-digit/blob/main/docs/specification.md)を参照してください。

## 必要環境

- Visual Studio Code 1.125.0以降

## ライセンス

[MIT](LICENSE)
