---
name: file-search
description: rg、findpath、findfilesを使用して、ファイル・フォルダー・ソースコードを効率的に検索する。
---

# File Search

ファイル、フォルダー、ソースコードを調査するときに使用する。

この環境では以下の検索手段を利用できる。

* `rg`
* `findpath`
* `findfiles`

目的に応じて適切なコマンドを選択する。

## コマンドの選択

### `findpath`

ファイル名やフォルダー名からパスを探す場合に使用する。

例:

```powershell
findpath "parser"
findpath "package.json"
findpath "test"
```

ファイルの中身ではなく、ファイル名・フォルダー名・パスを探したい場合は `findpath` を優先する。

### `findfiles`

ファイルの内容から、文字列やコードを探す場合に使用する。

例:

```powershell
findfiles "renderDigit" -All
findfiles "module.exports" -All
findfiles "markdown-it" -All
```

関数、変数、クラス、設定値、エラーメッセージなど、ファイル内部に存在する文字列を探す場合は `findfiles` を使用する。

### `rg`

検索条件が単純で、ripgrepを直接使用した方が明確な場合に使用する。

例:

```powershell
rg "renderDigit" src test
rg --files src
rg "module.exports" -g "*.js"
```

`findpath` や `findfiles` で十分な場合は、独自の複雑な検索コマンドを組み立てる必要はない。

## 組み合わせて検索する

`findpath` と `findfiles` はパイプラインで組み合わせて使用できる。

対象ファイルを `findpath` で絞り込み、その結果を `findfiles` へ渡すことで、検索対象を限定できる。

### 全ファイルから検索する

```powershell id="k5qw3d"
findfiles "TODO" -All
```

全ファイルを対象に文字列を検索したい場合に使用する。

### 特定のファイル名だけを対象に検索する

```powershell id="2cy5c2"
findpath "package.json" | findfiles '"private": true'
```

`package.json` だけを対象に、`"private": true` を含むファイルを検索する。

### 条件に一致しないファイルを検索する

```powershell id="yrxzg9"
findpath "*.md" | findfiles "TODO" -NotMatch
```

Markdownファイルのうち、`TODO` を含まないファイルを検索する。

### 複数条件で絞り込む

```powershell id="9zgtz3"
findpath "*.json" |
    findfiles '"private": true' |
    findfiles '"version"'
```

JSONファイルのうち、`"private": true` を含み、さらに `"version"` も含むファイルだけに絞り込む。

## 検索方針

検索対象が分かっている場合は、最初から全ファイルを検索せず、`findpath` で対象を絞ってから `findfiles` を使用する。

例えば、

```text id="ge7c0j"
対象ファイル名が分かっている
↓
findpath

対象ファイル内の条件で絞り込む
↓
findfiles

さらに条件を追加する
↓
findfiles をパイプで追加
```

という順序で検索する。

複数条件の検索では、1つの複雑な検索式を作るより、必要に応じてパイプラインで段階的に絞り込む。


## 使用方法が不明な場合

`findpath` または `findfiles` のオプションや挙動が不明な場合は、推測して使用せず、それぞれのヘルプを確認する。

```powershell
findpath -Help
findfiles -Help
```

ヘルプから確認できる事項を推測で補わない。

## 検索の進め方

検索は必要な範囲に絞って行う。

まず対象となるファイルやディレクトリを特定し、その後必要なコードを検索する。

基本的には次の順序で調査する。

```text
ファイルやフォルダーの場所が不明
↓
findpath

対象ファイルが判明
↓
findfiles または rg で関連コードを検索

必要な範囲のファイルを読む
```

ファイル名や対象ディレクトリがすでに分かっている場合は、不要な全体検索を行わない。

同じ内容について複数の検索方法を繰り返し実行しない。

## 検索結果の扱い

検索結果だけでコードの動作を断定しない。

必要に応じて対象ファイルを実際に読み、以下と照合する。

* 呼び出し元
* 呼び出し先
* 関連するテスト
* 設定ファイル
* 既存仕様
* ドキュメント

検索結果から確認できない情報を推測で補わない。

## 注意事項

* プロジェクトで定められたアクセス可能範囲がある場合は、その範囲を超えて検索しない
* リポジトリ全体の無制限な検索は、必要な場合だけ行う
* 生成物や依存パッケージなど、調査対象ではないディレクトリを不要に検索しない
* ファイルを検索するだけの作業で内容を変更しない
* 検索中に依頼と無関係な問題を発見しても、勝手に修正しない
