/* GENERATED, DO NOT EDIT DIRECTLY */

export type Schema0 = 'always' | 'never' | 'editorconfig' | 'unix' | 'windows'

export interface Schema1 {
  fallback?: 'always' | 'never' | 'off'
  [k: string]: unknown
}

export type RuleOptions = [Schema0?, Schema1?]
export type MessageIds = 'missing' | 'unexpected' | 'editorconfig'
