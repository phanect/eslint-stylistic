---
title: eol-last
rule_type: layout
---

# js/eol-last

Trailing newlines in non-empty files are a common UNIX idiom. Benefits of
trailing newlines include the ability to concatenate or append to files as well
as output files to the terminal without interfering with shell prompts.

## Rule Details

This rule enforces at least one newline (or absence thereof) at the end
of non-empty files.

Prior to v0.16.0 this rule also enforced that there was only a single line at
the end of the file. If you still want this behavior, consider enabling
[no-multiple-empty-lines](no-multiple-empty-lines) with `maxEOF` and/or
[no-trailing-spaces](no-trailing-spaces).

Examples of **incorrect** code for this rule:

::: incorrect

```js
/*eslint eol-last: ["error", "always"]*/⏎
⏎
function doSomething() {⏎
  var foo = 2;⏎
}
```

:::

::: incorrect

::: code-group

```js [JS]
/*eslint eol-last: ["error", "editorconfig", { "fallback": "never" }]*/⏎
⏎
function doSomething() {⏎
  const foo = 2;⏎
}
```

```ini [.editorconfig]
[*]
insert_final_newline = true
```

:::

::: incorrect

::: code-group

```js [JS]
/*eslint eol-last: ["error", "editorconfig", { "fallback": "never" }]*/⏎
⏎
function doSomething() {⏎
  const foo = 2;⏎
}⏎

```

```ini [.editorconfig]
# insert_final_newline is not set
```

:::

Examples of **correct** code for this rule:

::: correct

```js
/*eslint eol-last: ["error", "always"]*/⏎
⏎
function doSomething() {⏎
  var foo = 2;⏎
}⏎

```

:::

::: correct

::: code-group

```js [JS]
/*eslint eol-last: ["error", "editorconfig", { "fallback": "never" }]*/⏎
⏎
function doSomething() {⏎
  const foo = 2;⏎
}⏎

```

```ini [.editorconfig]
[*]
insert_final_newline = true
```

:::

::: correct

::: code-group

```js [JS]
/*eslint eol-last: ["error", "editorconfig", { "fallback": "never" }]*/⏎
⏎
function doSomething() {⏎
  var foo = 2;⏎
}
```

```ini [.editorconfig]
# insert_final_newline is not set
```

:::

## Options

This rule has a string option:

- `"always"` (default) enforces that files end with a newline (LF)
- `"never"` enforces that files do not end with a newline
- `"editorconfig"` enforces to follow EditorConfig's `insert_final_newline` property.
- `"unix"` (deprecated) is identical to "always"
- `"windows"` (deprecated) is identical to "always", but will use a CRLF character when autofixing

**Deprecated:** The options `"unix"` and `"windows"` are deprecated. If you need to enforce a specific linebreak style, use this rule in conjunction with `linebreak-style`.

This rule has an object option:

- `"fallback"` is only used when the first option is `"editorconfig"`. If your project does not have .editorconfig file, the value set here is used. Useful for sharable configs which may be used in the both projects with and without .editorconfig. `"always"`, `"never"`, or `"off"`.
