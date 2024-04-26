/* GENERATED, DO NOT EDIT DIRECTLY */

export type Schema0 =
  | ('tab' | 'first')
  | number
  | 'editorconfig'
  | {
    indentMode?: ('tab' | 'first') | number | 'editorconfig'
    ignoreTernaryOperator?: boolean
    fallback?: ('tab' | 'first') | number
    [k: string]: unknown
  }

export type RuleOptions = [Schema0?]
export type MessageIds = 'wrongIndent' | 'editorconfig'
