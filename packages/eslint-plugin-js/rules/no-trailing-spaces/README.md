---
title: no-trailing-spaces
rule_type: layout
---

# js/no-trailing-spaces

Sometimes in the course of editing files, you can end up with extra whitespace at the end of lines. These whitespace differences can be picked up by source control systems and flagged as diffs, causing frustration for developers. While this extra whitespace causes no functional issues, many code conventions require that trailing spaces be removed before check-in.

## Rule Details

This rule disallows trailing whitespace (spaces, tabs, and other Unicode whitespace characters) at the end of lines.

Examples of **incorrect** code for this rule:

::: incorrect

```js
/*eslint no-trailing-spaces: "error"*/

var foo = 0;/* trailing whitespace */
var baz = 5;/* trailing whitespace */
/* trailing whitespace */
```

:::

Examples of **correct** code for this rule:

::: correct

```js
/*eslint no-trailing-spaces: "error"*/

var foo = 0;
var baz = 5;
```

:::

## Options

This rule has an object option:

- `"skipBlankLines": false` (default) disallows trailing whitespace on empty lines
- `"skipBlankLines": true` allows trailing whitespace on empty lines
- `"ignoreComments": false` (default) disallows trailing whitespace in comment blocks
- `"ignoreComments": true` allows trailing whitespace in comment blocks
- `"editorconfig": true` follows .editorconfig's `trim_trailing_whitespace` setting.
- `"fallback": "on|off"` sets behavior when .editorconfig does not exist or `trim_trailing_whitespace` is not set.

### skipBlankLines

Examples of **correct** code for this rule with the `{ "skipBlankLines": true }` option:

::: correct

```js
/*eslint no-trailing-spaces: ["error", { "skipBlankLines": true }]*/

var foo = 0;
var baz = 5;
// ↓ a line with whitespace only ↓

```

:::

### ignoreComments

Examples of **correct** code for this rule with the `{ "ignoreComments": true }` option:

::: correct

```js
/*eslint no-trailing-spaces: ["error", { "ignoreComments": true }]*/

// ↓ these comments have trailing whitespace →
//
/**
 * baz
 *
 * bar
 */
```

:::

### EditorConfig support

Examples of **incorrect** code for this rule with the `{ "editorconfig": [ true, ...]}` option:

::: incorrect

::: code-group

```js [JS]
/*eslint no-trailing-spaces: ["error", { "editorconfig": true, "fallback": "off" }]*/

const foo = 0;/* trailing spaces */
const baz = 5;/* trailing spaces */
```

```ini [.editorconfig]
[*]
trim_trailing_whitespace = true
```

:::

::: incorrect

::: code-group

```js [JS]
/*eslint no-trailing-spaces: ["error", { "editorconfig": true, "fallback": "on" }]*/

const foo = 0;/* trailing spaces */
const baz = 5;/* trailing spaces */
```

```ini [.editorconfig]
# trim_trailing_whitespace is not set
```

:::

Examples of **correct** code for this rule with the `{ "editorconfig": [ true, ...]}` option:

::: correct

::: code-group

```js [JS]
/*eslint no-trailing-spaces: ["error", { "editorconfig": true, "fallback": "off" ] }]*/

// No trailing spaces under these lines
const foo = 0;
const baz = 5;
```

```ini [.editorconfig]
trim_trailing_whitespace = true
```

:::

::: correct

::: code-group

```js [JS]
/*eslint no-trailing-spaces: ["error", { "editorconfig": true, "fallback": "off" }]*/

const foo = 0;/* trailing spaces */
const baz = 5;/* trailing spaces */
```

```ini [.editorconfig]
# trim_trailing_whitespace is not set
```

:::
