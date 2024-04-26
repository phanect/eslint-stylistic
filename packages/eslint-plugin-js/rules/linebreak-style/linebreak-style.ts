/**
 * @fileoverview Rule to enforce a single linebreak style.
 * @author Erik Mueller
 */

import type { ReportFixFunction, Tree } from '@shared/types'
import { createGlobalLinebreakMatcher } from '../../utils/ast-utils'
import { createRule } from '../../utils/createRule'
import { type Config, editorconfig, message } from '../../../shared/editorconfig'
import type { MessageIds, RuleOptions } from './types'

const options = ['unix', 'windows']

export default createRule<MessageIds, RuleOptions>({
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent linebreak style',
      url: 'https://eslint.style/rules/js/linebreak-style',
    },

    fixable: 'whitespace',

    schema: [
      {
        type: 'string',
        enum: [
          ...options,
          'editorconfig',
        ],
      },
      {
        type: 'object',
        properties: {
          fallback: {
            type: 'string',
            enum: [
              ...options,
              'off',
            ],
          },
        },
      },
    ],
    messages: {
      expectedLF: 'Expected linebreaks to be \'LF\' but found \'CRLF\'.',
      expectedCRLF: 'Expected linebreaks to be \'CRLF\' but found \'LF\'.',
      editorconfig: message('linebreak-style'),
    },
  },

  create(context) {
    const sourceCode = context.sourceCode

    /**
     * Builds a fix function that replaces text at the specified range in the source text.
     * @param range The range to replace
     * @param text The text to insert.
     * @returns Fixer function
     * @private
     */
    function createFix(range: Readonly<Tree.Range>, text: string): ReportFixFunction {
      return function (fixer) {
        return fixer.replaceTextRange(range, text)
      }
    }

    return {
      Program: function checkForLinebreakStyle(node) {
        let linebreakStyle: Config<'linebreak-style'> | 'editorconfig' = context.options[0] || 'unix'
        const fallback = context.options[1]?.fallback

        if (linebreakStyle === 'editorconfig') {
          try {
            linebreakStyle = editorconfig.getOptions('linebreak-style', {
              lintTargetPath: context.filename,
              fallback,
            })
          }
          catch (err) {
            if (err instanceof Error && err.cause === 'NO_FALLBACK_AND_EDITORCONFIG') {
              context.report({
                loc: {
                  line: 0,
                  column: 0,
                },
                messageId: 'editorconfig',
              })
            }
            else {
              throw err
            }
          }
        }

        const expectedLF = linebreakStyle === 'unix'
        const expectedLFChars = expectedLF ? '\n' : '\r\n'
        const source = sourceCode.getText()
        const pattern = createGlobalLinebreakMatcher()
        let match

        let i = 0

        while ((match = pattern.exec(source)) !== null) {
          i++
          if (match[0] === expectedLFChars)
            continue

          const index = match.index
          const range = [index, index + match[0].length] as const

          context.report({
            node,
            loc: {
              start: {
                line: i,
                column: sourceCode.lines[i - 1].length,
              },
              end: {
                line: i + 1,
                column: 0,
              },
            },
            messageId: expectedLF ? 'expectedLF' : 'expectedCRLF',
            fix: createFix(range, expectedLFChars),
          })
        }
      },
    }
  },
})
