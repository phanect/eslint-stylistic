import stylistic from '../../../../../stub.js'

const stylisticConfig = stylistic.configs.customize()

/** @type { import("eslint").Linter.FlatConfig[] } */
const config = [
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      "@stylistic/eol-last": [ "error", "editorconfig", {
        "fallback": "always",
      }],
      "@stylistic/linebreak-style": [ "error", "editorconfig", {
        fallback: "unix",
      }],
      "@stylistic/no-trailing-spaces": [ "error", {
        editorconfig: true,
        fallback: "on"
      }],
    },
  },
  {
    files: [ "*.js", "*.ts" ],
    rules: {
      "@stylistic/indent": [ "error", "editorconfig" ],
    },
  },
  {
    files: [ "*.jsx", "*.tsx" ],
    rules: {
      "@stylistic/jsx-indent": [ "error", "editorconfig" ],
      "@stylistic/jsx-indent-props": [ "error", "editorconfig" ],
    },
  },
]

export default config
