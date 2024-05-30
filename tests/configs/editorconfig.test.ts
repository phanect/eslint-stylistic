import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, it } from 'vitest'
import fs from 'fs-extra'
import { execa } from 'execa'
import fg from 'fast-glob'
import type { Linter } from 'eslint'

const fixturesDir = fileURLToPath(new URL('fixtures', import.meta.url))

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})
afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

runWithFlatConfig('editorconfig-jsts', [{
  '@stylistic/eol-last': ['error', 'editorconfig', {
    fallback: 'always',
  }],
  '@stylistic/linebreak-style': ['error', 'editorconfig', {
    fallback: 'unix',
  }],
  '@stylistic/no-trailing-spaces': ['error', {
    editorconfig: true,
    fallback: 'on',
  }],
}])

function runWithFlatConfig(name: string, configs: Linter.FlatConfig['rules'][]) {
  it.concurrent(name, async ({ expect }) => {
    const from = resolve(fixturesDir, 'input')
    const output = resolve(fixturesDir, 'output', name)
    const target = resolve('_fixtures', name)

    await fs.rm(target, { recursive: true, force: true })

    await fs.copy(from, target, {
      filter: (src) => {
        return !src.includes('node_modules')
      },
    })
    await fs.writeFile(join(target, 'eslint.config.js'), `
// @eslint-disable
import stylistic from '@stylistic/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import parserVue from 'vue-eslint-parser'

export default [
  {
    files: ['**/*.?([cm])js'],
  },
  {
    files: ['*.jsx', '*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    }
  },
  {
    files: ['*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        sourceType: 'module',
      }
    }
  },
  {
    files: ['*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        parser: parserTs,
        sourceType: 'module',
      },
    }
  },
  ...${JSON.stringify(configs) ?? []},
]
  `)

    let error = null
    try {
      await execa('npx', ['eslint', '.', '--fix'], {
        cwd: target,
        stdio: 'pipe',
      })
    }
    catch (e) {
      error = e
    }

    const files = await fg('**/*', {
      ignore: [
        'node_modules',
        'eslint.config.js',
      ],
      cwd: target,
    })

    await Promise.all(files.map(async (file) => {
      const content = (await fs.readFile(join(target, file), 'utf-8')).replace(/\r\n/g, '\n').trim()
      const source = (await fs.readFile(join(from, file), 'utf-8')).replace(/\r\n/g, '\n').trim()
      const targetPath = join(output, file)

      if (content === source) {
        if (fs.existsSync(targetPath))
          await fs.remove(targetPath)
      }
      else {
        await expect.soft(content)
          .toMatchFileSnapshot(targetPath)
      }
    }))

    if (error)
      throw error
  }, 30_000)
}
