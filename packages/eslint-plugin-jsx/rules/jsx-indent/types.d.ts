/* GENERATED, DO NOT EDIT DIRECTLY */

export type Schema0 = 'tab' | number | 'editorconfig'

export interface Schema1 {
  checkAttributes?: boolean
  indentLogicalExpressions?: boolean
  fallback?: 'tab' | number | 'off'
}

export type RuleOptions = [Schema0?, Schema1?]
export type MessageIds = 'wrongIndent' | 'editorconfig'
