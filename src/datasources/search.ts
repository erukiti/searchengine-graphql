import { DataSource } from 'apollo-datasource'

import { Context } from '../context'

import { SearchEngine, SearchIndex, generateId } from '../search-engine'

export class SearchBackend extends DataSource<Context> {
  private _flexsearch: SearchEngine

  constructor(flexsearch: SearchEngine) {
    super()
    this._flexsearch = flexsearch
    // console.log('search backend!')
  }

  search(words: string[]) {
    const createQuery = (words: string[]) => words.join(' ')
    const query = createQuery(words)
    console.log('query', query)
    return this._flexsearch.search(query, {
      limit: 10,
    })
  }

  add(data: Pick<SearchIndex, 'title' | 'type' | 'uri' | 'content'>) {
    const { title = '', type, uri, content } = data
    const id = generateId(uri)
    this._flexsearch.add({ id, title, type, uri, content })
    return id
  }
}
