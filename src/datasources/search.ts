import { Index } from 'flexsearch'

import { DataSource } from 'apollo-datasource'
import { Context } from '../context'

import { SearchIndex, generateId } from '../search-engine'

export class SearchBackend extends DataSource<Context> {
  private _flexsearch: Index<{ id: number } & SearchIndex>

  constructor(flexsearch: Index<{ id: number } & SearchIndex>) {
    super()
    this._flexsearch = flexsearch
    console.log('search backend!')
  }

  search(words: string[]) {
    const createQuery = (words: string[]) => words.join(' ')
    const query = createQuery(words)
    console.log('query', query)
    return this._flexsearch.search(query, {
      limit: 10,
    })
  }

  add(data: SearchIndex) {
    const id = generateId()
    const { type, uri, content } = data
    const title = data.title || ''
    this._flexsearch.add({ id, title, type, uri, content })
    return id
  }
}
