/* GENERATED, DO NOT EDIT DIRECTLY */

export type Schema0 = 'unix' | 'windows' | 'editorconfig'

export interface Schema1 {
  fallback?: 'unix' | 'windows' | 'off'
  [k: string]: unknown
}

export type RuleOptions = [Schema0?, Schema1?]
export type MessageIds = 'expectedLF' | 'expectedCRLF' | 'editorconfig'
