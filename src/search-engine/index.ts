import Flexsearch, { Index } from 'flexsearch'

import { Maybe } from '../generated/graphql'

export { generateId } from './utils'
import { createTokenizer } from './tokenizer'

export type SearchIndex = {
  id: string
  type: string
  uri: string
  title: Maybe<string>
  content: string
}

export type SearchEngine = Index<SearchIndex>

export const createSearchEngine = async () => {
  const tokenize = await createTokenizer()
  const flexsearch: SearchEngine = Flexsearch.create({
    tokenize,
    doc: {
      id: 'id',
      field: ['title', 'content', 'uri', 'type'],
    },
  })
  return flexsearch
}
