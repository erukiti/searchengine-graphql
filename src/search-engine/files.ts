import fs from 'fs'
import path from 'path'

import globToRegexp from 'glob-to-regexp'

import { SearchEngine, generateId } from '.'

const converGitIgnoreToPatterns = (s: string) => {
  return s.split('\n').map(line => {
    if (line.endsWith('/')) {
      return globToRegexp(`**/${line}**`)
    }
    return globToRegexp(`**/${line}`)
  })
}

export const readDirRecursive = async (
  dir: string,
  ignorePatterns: RegExp[],
): Promise<string[]> => {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  if (entries.find(v => v.name === '.gitignore')) {
    const gitIgnore = fs.readFileSync('.gitignore', { encoding: 'utf-8' })
    ignorePatterns = [
      ...ignorePatterns,
      ...converGitIgnoreToPatterns(gitIgnore),
    ]
  }
  const res = await Promise.all(
    entries.map(async entry => {
      const name = path.join(dir, entry.name)
      const ignored = ignorePatterns.some(ignore => ignore.test(name))
      if (ignored) {
        return null
      }
      if (entry.isDirectory()) {
        const res = await readDirRecursive(name, ignorePatterns)
        return res.flat()
      } else {
        return name
      }
    }),
  )
  return res.flat().filter(name => name !== null)
}

export const fetchFiles = async (
  searchEngine: SearchEngine,
  basePath: string,
) => {
  const ignorePatterns = [globToRegexp('**/.git/**')]
  const filenames = await readDirRecursive(basePath, ignorePatterns)
  console.log('検索インデックス登録開始')
  await Promise.all(
    filenames.map(async filename => {
      const buf = await fs.promises.readFile(filename)
      const content = buf.toString('utf-8')
      console.log(filename, !content.includes('\uFFFD'))
      if (!content.includes('\uFFFD')) {
        searchEngine.add({
          id: generateId(filename),
          type: 'file',
          title: null,
          uri: path.resolve(filename),
          content,
        })
      }
    }),
  )
  console.log('検索インデックス登録完了')
}
