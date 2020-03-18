import kuromoji from 'kuromoji'
import Flexsearch, { TokenizerFn, Index } from 'flexsearch'

import { Maybe } from '../generated/graphql'

export { generateId } from './utils'

export type SearchIndex = {
  type: string
  uri: string
  title: Maybe<string>
  content: string
}

const createTokenizer = () => {
  return new Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>>(
    (resolve, reject) => {
      kuromoji
        .builder({
          dicPath: './node_modules/kuromoji/dict',
        })
        .build((err, tokenizer) => {
          if (err) {
            reject(err)
          } else {
            resolve(tokenizer)
          }
        })
    },
  )
}

export type SearchEngine = Index<{ id: number } & SearchIndex>

export const createSearchEngine = async () => {
  const tokenizer = await createTokenizer()

  const tokenize: TokenizerFn = (s: string) => {
    const tokenized = tokenizer.tokenize(s)
    return tokenized.map(token => {
      return token.surface_form
    })
  }
  const flexsearch: SearchEngine = Flexsearch.create({
    tokenize,
    doc: {
      id: 'id',
      field: ['title', 'content', 'uri', 'type'],
    },
  })
  return flexsearch
}
