# AGENTS

## 基本方針

* ユーザーとのやり取りは日本語で行う
* 既存のプロジェクト構成とコーディングスタイルに従う
* 実装前に関連コードと既存仕様を確認し、影響範囲を把握する
* 依頼を達成するために必要な最小限の変更にとどめる
* 依頼と関係のないファイルやコードは変更しない
* 必要がない限り、新しい依存パッケージを追加しない
* ソースコードや既存資料から確認できる事項を推測で判断しない
* ユーザーから見た動作、公開API、互換性などに影響する判断が必要な場合は、勝手に決定せず実装前に方針を提示する
* 内部実装上の軽微な判断は、既存コードや既存の設計方針に従って決定してよい
* 作業中に依頼と無関係な問題を発見した場合は、勝手に修正せず報告する

## Git

明示的に指示されない限り、以下は実行しない。

* `git commit`
* `git push`
* `git reset --hard`
* force push
* ブランチの削除

確認のため、必要に応じて以下を使用してよい。

* `git status`
* `git diff`
* `git log`

コミットメッセージの作成を求められた場合は、変更差分と `.gitmessage` を確認し、その形式に従って今回の変更内容を正確に反映する。

## 参照するルール

開発手順、ブランチ運用、テスト、Lint、コミット、公開については `CONTRIBUTING.md` に従う。

Codexの作業手順については `docs/agent-workflow.md` に従う。

## 作業開始時

コードを変更する前に、以下を確認する。

1. Out-of-Code Insights の未解決 annotationの確認
2. 関係するファイル
3. `package.json`
4. 関連する既存実装とテスト

変更対象に関連する annotation がある場合は、`manage-project-annotations` Skillを使用する。

## プロジェクト固有ルール

* 実装は原則として `src/` 以下に配置する
* テストは原則として `test/` 以下に配置する
* 既存APIとの互換性を維持する

## プロジェクト概要

`vscode-markdown-digit` は、npmパッケージ `markdown-it-digit` を利用してMarkdown内の数値表記を変換し、その結果をVS CodeのMarkdownプレビューへ反映する拡張機能である。

VS CodeのMarkdownプレビューで使用される `markdown-it` に `markdown-it-digit` をプラグインとして適用する。

主な目標は以下とする。

* npmパッケージ `markdown-it-digit` を依存関係として導入する
* VS CodeのMarkdownプレビューで使用される `markdown-it` に `markdown-it-digit` を適用する
* `markdown-it-digit` による変換結果がMarkdownプレビューへ正しく反映される状態にする

Markdownエディタ自体の表示や入力内容を変更するのではなく、Markdownプレビューへの `markdown-it-digit` の統合を主な目的とする。
